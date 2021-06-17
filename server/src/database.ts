import { Db, MongoClient } from "mongodb";
import { Course } from "./SharedObjects/course";
import { Student } from "./SharedObjects/users";

export class Database {
  private db: Db;
  private client: MongoClient;

  constructor(uri: string) {

    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.client.connect();

    this.db = this.client.db("blank-db");
  }

  addStudents(students: Student[]) {
    this.db.collection("students").insertMany(students, () => {
      console.log("DB Test : students added");
    });
  }

  addCourses(courses: Course[]) {
    this.db.collection("courses").insertMany(courses, () => {
      console.log("DB Test : courses added");
    });
  }
}
