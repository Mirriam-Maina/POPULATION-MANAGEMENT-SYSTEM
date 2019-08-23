import express from 'express';
import middleware from '../../middleware';
import LocationController from './LocationController';

const LocationControllerRouter = express.Router();
const { Authenticate, LocationValidation } = middleware;
const { createLocation, getAllLocations, viewLocationPopulation , deleteLocation, getSingleLocation} = LocationController;


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
    '/location/:id',
        LocationValidation.checkIfExists,
        Authenticate.checkToken,
        deleteLocation
)

export default LocationControllerRouter;
