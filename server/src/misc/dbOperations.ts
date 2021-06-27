import { ObjectId } from "mongodb";
import { Instructor, StudentGroup } from "../../../SharedObjects/users";
import DatabaseClient from "../database";

export const getAllInstructors = async (cl: DatabaseClient) => {
  const instructors: Instructor[] = [];
  await cl.db
    .collection("instructors")
    .find()
    .forEach((doc) => {
      instructors.push({
        firstName: doc.firstName,
        lastName: doc.lastName,
        username: doc.lastName,
        facultyId: doc.facultyId,
        _id: doc._id,
      });
    });

  return instructors;
};

export const getStudentGroups = async (cl: DatabaseClient) =>
  await cl.db
    .collection("studentGroups")
    .aggregate([
      {
        $lookup: {
          from: "faculties",
          localField: "facultyId",
          foreignField: "_id",
          as: "facultyDocs",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              { facultyName: { $arrayElemAt: ["$facultyDocs.facultyName",0] } },
              "$$ROOT",
            ],
          },
        },
      },
      {
        $project: {
          facultyDocs: 0,
          coursesId: 0,
        },
      },
    ])
    .toArray();
