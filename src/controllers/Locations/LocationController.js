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
    },

    viewLocationPopulation: async(req, res) => {
         const { id } = req.params;
         const getLocationPopulation = await Location.getPopulation(id)
         if (req.params.date !== 'null'){
             let dateFiltered = [];
            getLocationPopulation.forEach(population => population.date === req.query.date ? dateFiltered.push(population)
                : null);
            dateFiltered.length != 0 ? ErrorHandler.successResponse(res, 200, "Successfully retrieved population record", dateFiltered[0]) 
            : ErrorHandler.errorResponse(res, 404, "Could not find population record for that date") 
         }
         return ErrorHandler.successResponse(res, 200, "Successfully retrieved population", getLocationPopulation);
    }

}

export default LocationController;