const MongoClient = require('mongodb').MongoClient;

let url = "mongodb://localhost:27017/PopulationManagementSystem";
const client = new MongoClient(url, { useNewUrlParser: true });

// Connect to the db
let connection;
const connect = async() => {
 connection = await client.connect();
 const db = connection.db('PopulationManagementSystem')
 return db;
};

connect();
export default connect;
