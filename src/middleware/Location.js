import Joi from 'joi';
import strip from '../helpers/general';
import connect from '../database/config';
import ErrorHandler from '../helpers/errorHandler';


const ObjectID = require("mongodb").ObjectID;

const LocationSchema  = Joi.object().keys({
    county: Joi.string().min(3).max(30).required(),
    constituency: Joi.string().min(3).max(30).required(),
    ward: Joi.string().min(3).max(30).required()
});

const LocationValidation  = {
    inputValidation: (req, res, next)  => {
        const { county, constituency, ward }=req.body;
        const result =  Joi.validate({county, constituency, ward}, LocationSchema);
        result.error ? ErrorHandler.errorResponse(res, 400, result.error.details[0].message) :  LocationValidation.checkDuplicate(req.body, res, next)
    },

    checkDuplicate: async(body, res, next) => {
        const db = await connect();
        const { county, constituency, ward } = body;
        const findLocation = await db.collection('locations').findOne({
            'county': strip(county), 'constituency':strip(constituency), 'ward':strip(ward)
        })
        if(findLocation){
            return ErrorHandler.errorResponse(res, 409, 'this location already exists' )
        }
        next();
    }, 

    checkIfExists: async(req, res, next) => {
        const db = await connect();
        const { id } = req.params;
        ObjectID.isValid(id) ? next() : ErrorHandler.errorResponse(res, 404, "That location does  not exist");
    }
}

export default LocationValidation;