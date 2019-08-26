import omit from 'object.omit';
import User from '../../models/auth';
import ErrorHandler from '../../helpers/errorHandler';
import middleware from '../../middleware';

const { Authenticate } = middleware;

const AuthController  = {
    signup: async (req, res) => {
        const { email, firstName, lastName, password, gender, county, constituency, ward } = req.body;
        const newUser = new User(firstName, lastName, email, password, gender, county, constituency, ward);
        const createdUser = await newUser.addUser();
        const jwtToken = Authenticate.signToken({email});
        createdUser.token = jwtToken
        return ErrorHandler.successResponse(res, 201, "User successfully created", omit(createdUser, ['password', 'gender', 'ward', 'county', 'constituency']))
    },

    signin: async(req, res) => {
        const { email, password } = req.body;
        const signInUser = await User.signInUser(email, password)
        const jwtToken = Authenticate.signToken({email});
        signInUser ? signInUser.token = jwtToken : ErrorHandler.errorResponse(res, 400, "Incorrect username or password");
        return ErrorHandler.successResponse(res, 200, "User successfully logged in", omit(signInUser, ['password', 'gender', 'ward', 'county', 'constituency']));
    }
}

export default AuthController;

