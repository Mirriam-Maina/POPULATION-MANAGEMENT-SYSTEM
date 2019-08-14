import express from 'express';
import middleware from '../../middleware';
import PopulationController from './PopulationController';

const PopulationControllerRouter = express.Router();
const {PopulationValidation} = middleware;

PopulationControllerRouter.post(
    '/locations/:id/population',
    PopulationValidation.inputValidation,
    PopulationController.createPopulation
)

export default PopulationControllerRouter;