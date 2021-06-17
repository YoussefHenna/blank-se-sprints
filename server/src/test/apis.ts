import { Express } from "express";
import DatabaseClient from "./../database";
import * as Operations from "./dbOperations";
import * as testData from "./testData";

// APIs that can be used for testing

// this is a playground where you can test code

// you can also follow this as a guide for other APIs

const testAPIs = (app: Express, cl: DatabaseClient) => {
  app.post("/add-students-test", async (req, res) => {

    try {
      await Operations.addStudents(cl, testData.students);
      res.send("success");
    } catch (e) {
      console.log(e);
      res.send("internal server error");
    }
  });

  app.post("/add-courses-test", async (req, res) => {
    try {
      await Operations.addCourses(cl, testData.courses);
      res.send("success");
    } catch (e) {
      console.log(e);
      res.send("internal server error");
    }
  });
};

export default testAPIs;
