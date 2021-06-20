import { Express } from "express";
import DatabaseClient from "../database";
import * as Operations from "./dbOperations";
import * as Exceptions from "./exceptions";
import { ObjectId } from "Mongodb";
import { Course } from "../SharedObjects/course";

const containsCourseData = (obj: any): obj is Course => {
  return (
    "name" in obj &&
    "description" in obj &&
    "faculty" in obj &&
    "credits" in obj
  );
};

const editCourseApis = (app: Express, cl: DatabaseClient) => {
  Operations.init(cl);

  //Temporary hardcoded, till authentication is implemented
  const adminId = "60cc8175111a71a2f67da386";

  app.post("/add-course", async (req, res) => {
    console.log("called");
    try {
      const body = req.body;
      if (!containsCourseData(body)) {
        res.status(400).send({ error: "Missing Fields" });
        return;
      }
      await Operations.addCourse(body, adminId)
        .then(
          (value) => {
            res.send();
          },
          (error) => {
            res.status(400).send({ error });
          }
        )
        .catch((e) => {
          res.status(500).send({ error: "Server error" });
        });
    } catch (e) {
      res.status(500).send({ error: "Server error" });
    }
  });
};

export default editCourseApis;
