import { MongoClient } from "mongodb";

export default class DatabaseClient {
  private client: MongoClient;

  constructor(uri: string) {
    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.client.connect();
  }

  get db() {
    return this.client.db("blank-db");
  }
}
