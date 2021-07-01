import DatabaseClient from "../database";
import { Faculty } from "../../SharedObjects/faculty";
import { ObjectId, Db } from "mongodb";

let db: Db;

export const init = (cl: DatabaseClient) => {
  db = cl.db;
};

export const getFaculties = async (): Promise<Faculty[]> => {
  return new Promise(async (resolve, reject) => {
    const all: Faculty[] = [];
    await db
      .collection("faculties")
      .find()
      .forEach((item) => {
        all.push(item);
      });
    resolve(all);
  });
};
