import { Db, MongoClient } from "mongodb";


export class Database {
  private db: Db;
  private uri: string;
  private client: MongoClient;

  constructor(uri: string) {
    this.uri = uri;

    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.client.connect()

    this.db = this.client.db("blank-db");
  }

  addStudents(students: any[]) {
    this.db.collection("students").insertMany(students, () => {
      console.log("DB Test : students added");
    });
  }
}
