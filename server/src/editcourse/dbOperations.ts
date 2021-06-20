import DatabaseClient from "../database";
import { Course } from "../SharedObjects/course";
import { ObjectId, Db } from "Mongodb";

let db: Db;

export const init = (cl: DatabaseClient) => {
  db = cl.db;
};

export const addCourse = async (
  course: Course,
  adminId: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    delete course._id; //to prevent id from being uses, let mongo generate one
    db.collection("courses").insertOne(course, async (err, docInserted) => {
      if (err) {
        reject("Error " + err.errmsg);
      }
      await db.collection("admins").update(
        { _id: new ObjectId(adminId) },
        {
          $push: {
            coursesId: new ObjectId(docInserted.insertedId),
          },
        }
      );
      resolve(undefined);
    });
  });
};

export const updateCourse = (courseId: string, updatedCourse: Course) => {};

export const deleteCourse = (courseId: string) => {};
