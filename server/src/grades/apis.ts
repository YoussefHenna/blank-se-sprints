import { Router, Response } from "express";
import DatabaseClient from "../database";
// import * as Operations from "./dbOperations";
// import * as Exceptions from "./exceptions";
import { ObjectID, ObjectId } from "mongodb";
import Student from "../models/studentModel";
import { CourseGrade } from "../../../SharedObjects/course";
import Sauth from "../middleware/Sauth";
import Tauth from "../middleware/Tauth";

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

  router.use(["/student/grades"], Sauth);
  router.get("/student/grades", async (req, res) => {
    const studentId = checkIsStudent(res);
    if (!studentId) {
      return;
    }
    try {
      //First find the student with the given ID
      //Check models/studentModel.ts - I updated it to include array of grades
      const data = await Student.findById(studentId);

      //If has errors or data isnt retrieved, the send an error in response
      if (data.errors || data === undefined) {
        //400 is used to indicate error
        //Send json object with error details, to be able to know what went wrong
        res.status(400).send({ error: "No student with given id" });
      } else {
        //Send the grades in a new object with key grades, if it exists
        if (data.get("grades")) {
          res.send({ grades: data.get("grades") });
        } else {
          //send empty list if student doesnt have any grades
          res.send({ grades: [] });
        }
      }
    } catch (e) {
      res.status(500).send({ error: "Server error" });
    }
  });

  router.use(["/instructor/grades"], Tauth);
  router.patch("/instructor/grades", async (req, res) => {
    const tId = checkIsInstructor(res);
    if (!tId) {
      return;
    }
    try {
      //Request should include these in the body, to know which course grade to change
      //and to which student
      const { courseId, studentUsername, grade } = req.body;

      //First find the student and check if a grade already exists for the given course
      //If so then remove it
      await Student.findOneAndUpdate(
        { username: studentUsername },
        {
          $pull: { grades: { courseId: new ObjectID(courseId) } },
        }
      );

      //Add the new/updated grade to the list
      await Student.findOneAndUpdate(
        { username: studentUsername },
        {
          $push: { grades: { courseId: new ObjectID(courseId), grade } },
        }
      );

      //Send empty response, indicating operation has succeeded
      res.send();
    } catch (e) {
      console.log(e);
      res.status(500).send({ error: "Server error" });
    }
  });

  router.get("/instructor/grades/:studentUsername", async (req, res) => {
    const tId = checkIsInstructor(res);
    if (!tId) {
      return;
    }
    try {
      //First find the student with the given ID
      //Check models/studentModel.ts - I updated it to include array of grades
      const data = await Student.findOne({
        username: req.params.studentUsername,
      });

      //If has errors or data isnt retrieved, the send an error in response
      if (data.errors || data === undefined) {
        //400 is used to indicate error
        //Send json object with error details, to be able to know what went wrong
        res.status(400).send({ error: "No student with given username" });
      } else {
        //Send the grades in a new object with key grades, if it exists
        if (data.get("grades")) {
          res.send({ grades: data.get("grades") });
        } else {
          //send empty list if student doesnt have any grades
          res.send({ grades: [] });
        }
      }
    } catch (e) {
      res.status(500).send({ error: "Server error" });
    }
  });
};
export default gradesAPIs;
