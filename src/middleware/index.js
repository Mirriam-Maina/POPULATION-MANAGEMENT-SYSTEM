import Authenticate from './Authenticate';
import AuthValidation from './AuthValidation';
import LocationValidation from './Location';

const middleware = {
    Authenticate,
    AuthValidation,
    LocationValidation
};

export default middleware;