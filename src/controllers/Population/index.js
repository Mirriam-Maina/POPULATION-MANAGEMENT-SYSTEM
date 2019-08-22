import express from 'express';
import middleware from '../../middleware';
import PopulationController from './PopulationController';

const PopulationControllerRouter = express.Router();
const {PopulationValidation, Authenticate, LocationValidation} = middleware;

PopulationControllerRouter.post(
    '/locations/:id/population',
    Authenticate.checkToken,
    LocationValidation.checkIfExists,
    PopulationValidation.inputValidation,
    PopulationController.createPopulation
)

PopulationControllerRouter.delete(
    '/locations/:id/population/:populationId',
    Authenticate.checkToken,
    LocationValidation.checkIfExists,
    PopulationController.deletePopulation
)

export default PopulationControllerRouter;