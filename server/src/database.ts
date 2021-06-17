import { Db, MongoClient } from "mongodb";

let db : Db

export function initDb() {
  const uri = "mongodb://localhost:27017?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect();
  db = client.db("blank-db");
}

