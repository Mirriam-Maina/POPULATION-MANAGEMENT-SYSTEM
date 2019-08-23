import connect from '../database/config';
import strip from '../helpers/general';
const ObjectID = require("mongodb").ObjectID;

export default class Location{

    constructor(county,  constituency, ward){
        this.county = county
        this.constituency = constituency
        this.ward = ward
    }

    async addNew(){
        const db = await connect();
        const addLocation = await db.collection('locations').insertOne({county: strip(this.county), constituency: strip(this.constituency), ward: strip(this.ward)})
        const newLocation = await db.collection('locations').findOne({'_id':addLocation.insertedId})
        return newLocation;
    }

    static async getAll(){
        const db = await connect();
        const getAllLocations = await db.collection('locations').find().toArray();
        return getAllLocations;
    }

    static async getSingleLocation(locationId){
        const db = await connect();
        const getOneLocation = await db.collection('locations').findOne({'_id':ObjectID(locationId)})
        return getOneLocation;
    }

    static async getPopulation(id){
        const db = await connect();
        const getLocationPopulation = await db.collection('locations').findOne({'_id':ObjectID(id)})
        return getLocationPopulation.population;
    }

    static async deleteLocation(id){
        const db = await connect();
        const deleteLocationRecord = await db.collection('locations').deleteOne({'_id':ObjectID(id)});
        return deleteLocationRecord
    }

    static async updateLocation(id, body){
        const db = await connect();
        const updatedLocation = await db.collection('locations').updateOne({'_id':ObjectID(id)}, {$set: {'county':body.county, 'constituency':body.constituency, ward: body.ward}})
        const newLocation = await db.collection('locations').findOne({'_id':ObjectID(id)});
        return newLocation;
    }

}