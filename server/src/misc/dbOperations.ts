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

export const getStudentGroups = async (cl: DatabaseClient, query?: string) => {
  query = query.toLowerCase()
  let agg: any[] = [
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
            {
              facultyName: {
                $arrayElemAt: ["$facultyDocs.facultyName", 0],
              },
            },
            "$$ROOT",
          ],
        },
      },
    },
  ];

  if (query) {
    agg.push(
      {
        $addFields: {
          admissionYearString: { $toString: "$admissionYear" },
          facultyNameString: { $toLower: { $toString: "$facultyName" } },
        },
      },
      {
        $match: {
          $or: [
            { facultyNameString: { $regex: query } },
            { admissionYearString: { $regex: query } },
          ],
        },
      }
    );
  }

  agg.push({
    $project: {
      facultyDocs: 0,
      coursesId: 0,
      admissionYearString: 0,
      facultyNameString : 0,
    },
  });

  return await cl.db.collection("studentGroups").aggregate(agg).toArray();
};
