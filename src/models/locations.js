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

    static async getPopulation(id){
        const db = await connect();
        const getLocationPopulation = await db.collection('locations').findOne({'_id':ObjectID(id)})
        return getLocationPopulation.population;
    }
}