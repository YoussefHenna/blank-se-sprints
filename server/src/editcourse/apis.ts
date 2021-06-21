import { Express } from "express";
import DatabaseClient from "../database";
import * as Operations from "./dbOperations";
import * as Exceptions from "./exceptions";
import { ObjectId } from "Mongodb";
import { Course } from "../../../SharedObjects/course";

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

  app.get("/faculties", async (req, res) => {
    try {
      await Operations.getFaculties()
        .then(
          (value) => {
            res.send({ faculties: value });
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

  app.get("/courses/:facId", async (req, res) => {
    try {
      await Operations.getCourses(req.params.facId)
        .then(
          (value) => {
            res.send({ courses: value });
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

  app.post("/course", async (req, res) => {
    try {
      const body = req.body;
      if (!containsCourseData(body)) {
        res.status(400).send({ error: "Missing Fields" });
        return;
      }
      await Operations.addCourse(
        { ...body, faculty: new ObjectId(body.faculty) },
        adminId
      )
        .then(
          () => {
            res.send();
          },
          (error) => {
            res.status(400).send({ error });
          }
        )
        .catch((e) => {
          if (e === "Same name") {
            res.status(400).send({ error: "Same name used" });
          } else {
            res.status(500).send({ error: "Server error" });
          }
        });
    } catch (e) {
      res.status(500).send({ error: "Server error" });
    }
  });

  app.put("/course/:courseId", async (req, res) => {
    try {
      if (!req.params.courseId) {
        res.status(400).send({ error: "Missing course id" });
      }
      const body = req.body;
      await Operations.updateCourse(req.params.courseId, {
        ...body,
        faculty: new ObjectId(body.faculty),
      })
        .then(
          () => {
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

  app.delete("/course/:courseId", async (req, res) => {
    try {
      if (!req.params.courseId) {
        res.status(400).send({ error: "Missing course id" });
      }
      await Operations.deleteCourse(req.params.courseId)
        .then(
          () => {
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
