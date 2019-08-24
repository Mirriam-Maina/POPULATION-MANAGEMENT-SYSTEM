const ObjectID = require("mongodb").ObjectID;

class Population {
    constructor(id, date, female, male){
        this.female = female
        this.male = male
        this.date = date
        this.id = id
    }

    async createPopulation(){
        const timestamp = new Date().getTime();
        const createdPopulation = {
            id: timestamp,
            female: this.female,
            male: this.male,
            date: this.date
        }
        const addPopulationToLocation = await db.collection('locations').updateOne({'_id':ObjectID(this.id)},{$push: {'population': createdPopulation}})
        const location = await db.collection('locations').findOne({'_id': ObjectID(this.id)})
        return location
    }

    static async deletePopulation(locationId, populationId){
        const deletePopulation = await db.collection('locations').updateOne({'_id':ObjectID(locationId)}, {$pull: {'population': {'id':Number(populationId)}}})
        return deletePopulation;
    }

    static async updatePopulation(locationId, populationId, body){
        const { female, male, date } = body;
        const updatedPopulation = await db.collection('locations').updateOne({'_id':ObjectID(locationId), 'population.id':populationId}, 
                                {$set: {'population.$.female':female, 'population.$.male':male, 'population.$.date':date}})
        return updatedPopulation;
    }
}

export default Population;