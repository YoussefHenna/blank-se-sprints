import DatabaseClient from "../database";
import { Course } from "../../SharedObjects/course";
import { ObjectId, Db } from "mongodb";

let db: Db;

export const init = (cl: DatabaseClient) => {
  db = cl.db;
};

function generateDarkColorRgb() {
  const red = Math.floor((Math.random() * 256) / 2);
  const green = Math.floor((Math.random() * 256) / 2);
  const blue = Math.floor((Math.random() * 256) / 2);
  return "rgb(" + red + ", " + green + ", " + blue + ")";
}

export const getCourses = async (facId: string): Promise<Course[]> => {
  return new Promise(async (resolve, reject) => {
    const all: Course[] = [];
    await db
      .collection("courses")
      .find({ faculty: new ObjectId(facId) })
      .forEach((item) => {
        all.push(item);
      });
    resolve(all);
  });
};

export const addCourse = async (
  course: Course,
  adminId: string
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    delete course._id; //to prevent id from being uses, let mongo generate one
    course.color = generateDarkColorRgb();
    const sameName = await db
      .collection("courses")
      .findOne({ name: course.name });
    if (sameName) {
      reject("Course with the given code already exists");
      return;
    }
    db.collection("courses").insertOne(course, async (err, docInserted) => {
      if (err) {
        reject("Error " + err.errmsg);
      }
      await db.collection("admins").updateOne(
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

export const updateCourse = async (
  courseId: string,
  updatedCourse: Course
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    delete updatedCourse._id;
    if (updatedCourse.faculty != undefined) {
      updatedCourse.faculty = new ObjectId(updatedCourse.faculty);
    }
    await db.collection("courses").updateOne(
      { _id: new ObjectId(courseId) },
      {
        $set: { ...updatedCourse },
      }
    );
    resolve(undefined);
  });
};

export const deleteCourse = (courseId: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    await db.collection("courses").deleteOne({ _id: new ObjectId(courseId) });
    await db.collection("admins").updateMany(
      {},
      {
        $pull: {
          coursesId: new ObjectId(courseId),
        },
      }
    );
    await db.collection("studentGroups").updateMany(
      {},
      {
        $pull: {
          coursesId: new ObjectId(courseId),
        },
      }
    );
    await db.collection("students").updateMany(
      {},
      {
        $pull: {
          enrolledCoursesId: new ObjectId(courseId),
        },
      }
    );
    await db
      .collection("sessions")
      .deleteOne({ courseId: new ObjectId(courseId) });

    resolve(undefined);
  });
};
