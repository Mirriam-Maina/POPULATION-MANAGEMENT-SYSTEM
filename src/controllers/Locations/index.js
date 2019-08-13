import express from 'express';
import middleware from '../../middleware';
import LocationController from './LocationController';

const LocationControllerRouter = express.Router();
const { Authenticate, LocationValidation } = middleware;
const { createLocation, getAllLocations } = LocationController;


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


export default LocationControllerRouter;
