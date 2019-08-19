import connect from '../database/config';

const ObjectID = require("mongodb").ObjectID;

class Population {
    constructor(id, date, female, male){
        this.female = female
        this.male = male
        this.date = date
        this.id = id
    }

    async createPopulation(){
        const db = await connect();
        const timestamp = new Date().getTime();
        const createdPopulation = {
            id: timestamp,
            female: this.female,
            male: this.male,
            date: this.date
        }
        console.log('craeating',typeof(createdPopulation.id))
        const addPopulationToLocation = await db.collection('locations').updateOne({'_id':ObjectID(this.id)},{$push: {'population': createdPopulation}})
        const location = await db.collection('locations').findOne({'_id': ObjectID(this.id)})
        return location
    }

    static async deletePopulation(locationId, populationId){
        const db = await connect();
        const deletePopulation = await db.collection('locations').update({'_id':ObjectID(locationId)}, {$pull: {'population': {'id':Number(populationId)}}})
        return deletePopulation;
    }
}

export default Population;