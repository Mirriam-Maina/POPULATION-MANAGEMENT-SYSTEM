import Joi from 'joi';
import connect from '../database/config';
import ErrorHandler from '../helpers/errorHandler';


const PopulationSchema = Joi.object().keys({
    date: Joi.date().iso(),
    female: Joi.number().required(),
    male: Joi.number().required(),
})

const PopulationValidation = {
    inputValidation: (req, res, next) => {
        const { female, male, date} = req.body;
        const result = Joi.validate({female, male, date}, PopulationSchema);
        if(result.error){
           return ErrorHandler.errorResponse(res, 400, result.error.details[0].message)
        }
        PopulationValidation.checkDuplicate(req, res, next);
    },

    checkDuplicate: async(req, res, next) => {
        const db = await connect();
        const { date } = req.body;
        const populationExists = await db.collection('population').findOne({'date': date });
        if(populationExists){
            ErrorHandler.errorResponse(res, 400, 'Population as of that date already exists')
        }
        next();
    }
}

export default PopulationValidation;