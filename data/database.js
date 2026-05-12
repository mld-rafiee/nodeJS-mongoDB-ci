import { MongoClient } from 'mongodb';

const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

//const uri = `mongodb+srv://${dbUser}:${dbPassword}@${clusterAddress}/?retryWrites=true&w=majority`;
const uri = `mongodb://${dbUser}:${dbPassword}@localhost:27017/${dbName}authSource=admin&directConnection=true&serverSelectionTimeoutMS=5000`;

const client = new MongoClient(uri);





try {
  client = new MongoClient(uri);
  console.log('Hang On! Connecting to your DB...');
  await client.connect();
  console.log('Connected to your DB Server');
  const database = client.db(dbName);
  await database.command({ ping: 1 });

  console.log('Ping Successful!');

} catch (error) {
  console.log('Oops! Connection failed.');
  process.exit(1);
}



export default database;
