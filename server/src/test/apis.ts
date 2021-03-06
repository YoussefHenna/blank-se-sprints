import { Router } from "express";
import DatabaseClient from "./../database";
import * as Operations from "./dbOperations";
import { ObjectId } from "mongodb";

// APIs that can be used for testing

// this is a playground where you can test code

// you can also follow this as a guide for other APIs

const testAPIs = (router: Router, cl: DatabaseClient) => {
  router.get("/student-courses/:sid", async (req, res) => {
    try {
      const sid = new ObjectId(req.params.sid); //extract student id from the url and convert it to an ObjectId
      const courses = await Operations.getStudentCourses(cl, sid);
      console.log(courses);
      res.statusCode = 200;
      res.send(courses);
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      res.send({ msg: "internal server error" });
    }
  });

  router.get("/students-test", async (req, res) => {
    try {
      const students = await Operations.getAllStudents(cl);
      res.statusCode = 200;
      res.send(students);
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      res.send({ msg: "internal server error" });
    }
  });
};

export default testAPIs;
