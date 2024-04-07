import { MongoClient } from "mongodb";

const connectionString = process.env.MONGO_URI || "mongodb+srv://01laurenjohnson:Huskyonion957@mongopractice.6uirarb.mongodb.net/";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch (error) {
  console.log(error);
}

let db = conn.db("sample_restaurants");

export default db;