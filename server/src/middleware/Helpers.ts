import { ObjectID } from "mongodb";
import Admin from "../models/adminModel";
import Instructor from "../models/instructorModel";
import Student from "../models/studentModel";

export const findUserType = async (
  id: string
): Promise<"student" | "admin" | "instructor"> => {
  return new Promise(async (resolve, reject) => {
    const inst = await Instructor.findOne({ _id: new ObjectID(id) });
    if (inst) {
      resolve("instructor");
    }

    const student = await Student.findOne({ _id: new ObjectID(id) });
    if (student) {
      resolve("student");
    }

    const admin = await Admin.findOne({ _id: new ObjectID(id) });
    if (admin) {
      resolve("admin");
    }

    reject();
  });
};
