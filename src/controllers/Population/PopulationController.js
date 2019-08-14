import Population from '../../models/population';
import ErrorHandler from '../../helpers/errorHandler';

const PopulationController = {
    createPopulation: async(req, res) => {
        const { date, female, male }= req.body;
        const locationId = req.params.id;
        const populationDb = new Population(locationId, date, female, male)
        const locationData = await populationDb.createPopulation();
        const createdPopulation = locationData.population[locationData.population.length-1];
        locationData.population = createdPopulation;
        return ErrorHandler.successResponse(res, 201, 'Population added successfully', locationData);
    }
}

export default PopulationController;