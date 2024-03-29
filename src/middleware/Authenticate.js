import jwt from 'jsonwebtoken';
import connect from '../database/config';
import ErrorHandler from '../helpers/errorHandler';

require('dotenv').config();

const Authenticate =  {
 signToken: (payload) => {
      let token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          data: payload
        }, process.env.APP_SECRET);
      return token;
    },

decodeToken: async(req, res, token, next) => {
      const db  = await connect();
      jwt.verify(token, process.env.APP_SECRET, async (error, decoded)=>{
        if(error){
          return ErrorHandler.errorResponse(res, 400, error.message);
        }
        else{
          const user = decoded.data.email;
          const userExists = await db.collection('users').findOne({'email':user});
          if(!userExists) {
             return ErrorHandler.errorResponse(res, 400, 'This token is no longer valid') }
          else {
            req.user = user;
            next();
             }
        };
      });
    },

checkToken: (req, res, next) => {
        const token = req.headers.authorization
          || req.body.token
          || req.query.token;
          if(!token) {
            return ErrorHandler.errorResponse(res, 401, 'Please provide a token')
          }
          else{ 
              Authenticate.decodeToken(req, res, token, next);
            }
       
    },
   
};

export default Authenticate;

  