import express from 'express';
import middleware from '../../middleware';
import LocationController from './LocationController';

const LocationControllerRouter = express.Router();
const { Authenticate, LocationValidation } = middleware;
const { createLocation, getAllLocations, viewLocationPopulation ,
     deleteLocation, getSingleLocation, updateLocation} = LocationController;


LocationControllerRouter.post(
    '/locations',
Authenticate.checkToken,
LocationValidation.inputValidation,
createLocation
)

LocationControllerRouter.get(
    '/locations',
    Authenticate.checkToken,
    getAllLocations
)

LocationControllerRouter.get(
    '/locations/:id/population',
    LocationValidation.checkIfExists,
    Authenticate.checkToken,
    viewLocationPopulation
)

LocationControllerRouter.get(
    '/locations/:id/',
    LocationValidation.checkIfExists,
    Authenticate.checkToken,
    getSingleLocation
)

LocationControllerRouter.delete(
    '/locations/:id',
        LocationValidation.checkIfExists,
        Authenticate.checkToken,
        deleteLocation
)

LocationControllerRouter.patch(
    '/locations/:id',
        LocationValidation.checkIfExists,
        Authenticate.checkToken,
        updateLocation    
)


export default LocationControllerRouter;
