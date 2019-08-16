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
        const createPopulation = await db.collection('population').insertOne({date: this.date, female: this.female, male: this.male})
        const createdPopulation = await db.collection('population').findOne({'_id': createPopulation.insertedId})
        const addPopulationToLocation = await db.collection('locations').updateOne({'_id':ObjectID(this.id)},{$push: {'population': createdPopulation}})
        const location = await db.collection('locations').findOne({'_id': ObjectID(this.id)})
        return location
    }
}

export default Population;