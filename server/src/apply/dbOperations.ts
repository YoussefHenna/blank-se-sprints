import DatabaseClient from "../database";
import { ObjectId, Db } from "mongodb";

let db: Db;

export const init = (cl: DatabaseClient) => {
  db = cl.db;
};

export const addApplication = async (application: any): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const sameNationalId = await db.collection("applications").findOne({
      "personalInformation.nationalId":
        application.personalInformation.nationalId,
    });
    if (sameNationalId) {
      reject("Application with the same national ID previously submitted");
      return;
    }
    const sameEmail = await db.collection("applications").findOne({
      "personalInformation.email": application.personalInformation.email,
    });
    if (sameEmail) {
      reject("Application with the same email previously submitted");
      return;
    }
    db.collection("applications").insertOne(
      application,
      async (err, docInserted) => {
        if (err) {
          reject("Error " + err.errmsg);
        }
        resolve(undefined);
      }
    );
  });
};
