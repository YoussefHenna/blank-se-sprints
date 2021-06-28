import { Express } from "express";
import DatabaseClient from "../database";
// import * as Operations from "./dbOperations";
// import * as Exceptions from "./exceptions";
import { ObjectID, ObjectId } from "mongodb";
import Student from "../models/studentModel";
import { CourseGrade } from "../../../SharedObjects/course";

const gradesAPIs = (app: Express, cl: DatabaseClient) => {
  //For now use this student ID, change to use value in cookie later (after auth finished)
  const studentId = "60cc811b111a71a2f67da382";

  app.get("/student/grades", async (req, res) => {
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

  app.patch("/student/grades", async (req, res) => {
    try {
      //Request should include these in the body, to know which course grade to change
      //and to which student
      const { courseId, studentId, grade } = req.body;

      //First find the student and check if a grade already exists for the given course
      //If so then remove it
      await Student.findByIdAndUpdate(studentId, {
        $pull: { grades: { courseId: new ObjectID(courseId) } },
      });

      //Add the new/updated grade to the list
      await Student.findByIdAndUpdate(studentId, {
        $push: { grades: { courseId: new ObjectID(courseId), grade } },
      });

      //Send empty response, indicating operation has succeeded
      res.send();
    } catch (e) {
      console.log(e);
      res.status(500).send({ error: "Server error" });
    }
  });
};
export default gradesAPIs;



