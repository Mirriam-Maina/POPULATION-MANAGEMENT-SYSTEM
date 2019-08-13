import strip from '../../helpers/general'
import Location from '../../models/locations';
import ErrorHandler from '../../helpers/errorHandler';

const LocationController = {
    createLocation: async(req, res) =>{
        const { county, constituency, ward } = req.body;
        const LocationDb = new Location(strip(county), strip(constituency), strip(ward));
        const newLocation = await LocationDb.addNew();
        return ErrorHandler.successResponse(res, 201, "successfully created location", newLocation);
    },

    getAllLocations: async(req,res) => {
        const allLocations = await Location.getAll();
        return ErrorHandler.successResponse(res, 200, "successfully retrieved locations", allLocations);
    }

}

export default LocationController;