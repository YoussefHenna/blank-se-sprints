import { Router, Response } from "express";
import DatabaseClient from "../database";
// import * as Operations from "./dbOperations";
// import * as Exceptions from "./exceptions";
import { ObjectID, ObjectId } from "mongodb";
import Student from "../models/studentModel";
import { CourseGrade } from "../../SharedObjects/course";
import Sauth from "../middleware/Sauth";
import Tauth from "../middleware/Tauth";
import * as Operations from "../miscPublic/dbOperations";

import type IData from "../../SharedObjects/GradesData";

const checkIsStudent = (res: Response): string | undefined => {
  const studentId = res.locals["id"];
  if (!studentId) {
    res.send({ error: "Unauthroized request" });
    return;
  }
  return studentId;
};

const checkIsInstructor = (res: Response): string | undefined => {
  const tId = res.locals["id"];
  if (!tId) {
    res.send({ error: "Unauthroized request" });
    return;
  }
  return tId;
};

const gradesAPIs = (router: Router, cl: DatabaseClient) => {
  //For now use this student ID, change to use value in cookie later (after auth finished)

  async function setCourcesNames(courses): Promise<IData["grades"]> {
    courses = [...courses];
    let dbCourses = await cl.db.collection("courses").find().toArray();

    return courses.map((c) => {
      let course = dbCourses.find((ccNotSisi) => ccNotSisi._id.toHexString() === c.courseId.toHexString());
      if (!course) return c;
      return {
        ...c,
        name: course.name,
        description: course.description,
        credits: course.credits,
        color: course.color
      };
    });
  }

  async function sendStudentData(
    { studentId, studentUsername }: { studentId?: string; studentUsername?: string },
    res
  ) {
    // First find the student with the given ID
    // Check models/studentModel.ts - I updated it to include array of grades
    const studentData = studentId
      ? await Student.findById(studentId)
      : await Student.findOne({
          username: studentUsername
        });

    //First find the student and check if a grade already exists for the given course
    //If so then remove it
    await Student.findOneAndUpdate(
      { username: "jason" },
      {
        $pull: {
          grades: { courseId: new ObjectID("60cc80eb111a71a2f67da381") }
        }
      }
    );
    // console.log(studentData);
    //If has errors or data isnt retrieved, the send an error in response
    if (!studentData || studentData.errors) {
      //400 is used to indicate error
      //Send json object with error details, to be able to know what went wrong
      return res.status(404).send({ error: "No student with given id" });
    }
    const faculties = await cl.db.collection("faculties").find().toArray();

    const data: IData = {
      grades: (await setCourcesNames(studentData.get("grades"))) || [], // TODO: get cources names not IDs
      student: {
        name: `${studentData.get("firstName")} ${studentData.get("lastName")}`,
        username: studentData.get("username"),
        semester: studentData.get("semester"),
        admissionYear: studentData.get("admissionYear"),
        faculty: faculties.find((fac) => fac._id.toHexString() === studentData.get("facultyID")).name
      }
    };

    res.send(data);
  }

  router.use(["/student/grades"], Sauth);

  router.get("/student/grades", async (req, res) => {
    const studentId = checkIsStudent(res);
    if (!studentId) return;
    try {
      await sendStudentData({ studentId }, res);
    } catch (e) {
      res.status(500).send({ error: "Server error" });
    }
  });

  // ---------- instructor -----------

  router.use(["/instructor/grades"], Tauth);

  router.get("/instructor/grades/:studentUsername", async (req, res) => {
    const tId = checkIsInstructor(res);
    if (!tId) return;
    try {
      sendStudentData({ studentUsername: req.params.studentUsername }, res);
    } catch (e) {
      res.status(500).send({ error: "Server error" });
    }
  });

  router.patch("/instructor/grades", async (req, res) => {
    const tId = checkIsInstructor(res);
    if (!tId) return;

    try {
      //Request should include these in the body, to know which course grade to change
      //and to which student
      const data: IData = req.body;

      data.grades.forEach(async (g) => {
        // First find the student and check if a grade already exists for the given course
        // If so then remove it
        const { courseId, grade } = g;

        await Student.findOneAndUpdate(
          { username: data.student.username },
          {
            $pull: { grades: { courseId: new ObjectID(courseId) } }
          }
        );

        // Add the new/updated grade to the list
        await Student.findOneAndUpdate(
          { username: data.student.username },
          {
            $push: { grades: { courseId: new ObjectID(courseId), grade } }
          }
        );
      });

      //Send empty response, indicating operation has succeeded
      res.send({ message: "updated succesfully: " + data.student.username });
    } catch (e) {
      console.log(e);
      res.status(500).send({ error: "Server error" });
    }
  });
};
export default gradesAPIs;
