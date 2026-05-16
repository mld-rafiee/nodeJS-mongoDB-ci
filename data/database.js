import { MongoClient } from 'mongodb';

const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;


//const uri = `mongodb+srv://${dbUser}:${dbPassword}@${clusterAddress}/?retryWrites=true&w=majority`;
// const uri = `mongodb://${dbUser}:${dbPassword}@localhost:27017/${dbName}authSource=admin&directConnection=true&serverSelectionTimeoutMS=5000`;
// const uri = `mongodb+srv://${dbUser}:${dbPassword}@${clusterAddress}/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${encodeURIComponent(dbUser)}:${encodeURIComponent(dbPassword)}@${clusterAddress}/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

let database;

try {

  console.log('Hang On! Connecting to your DB...');
  await client.connect();
  console.log('Connected to your DB Server');

  database = client.db(dbName);
  await database.command({ ping: 1 });

  console.log('Ping Successful!');

} catch (error) {
  console.log('Oops! Connection failed.');
  console.error(error);
  process.exit(1);
}



export default database;
