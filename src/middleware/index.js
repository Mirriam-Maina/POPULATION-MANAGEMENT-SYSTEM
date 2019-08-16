import Authenticate from './authenticate';
import AuthValidation from './authValidation';
import LocationValidation from './location';
import PopulationValidation from './population';

const middleware = {
    Authenticate,
    AuthValidation,
    LocationValidation,
    PopulationValidation
};

export default middleware;