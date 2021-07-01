import { Request, Response, Router } from "express";
import DatabaseClient from "../database";
import * as Operations from "./dbOperations";
import { ObjectId } from "mongodb";
import { Course } from "../../SharedObjects/course";
import Aauth from "../middleware/Aauth";

const containsCourseData = (obj: any): obj is Course => {
  return "name" in obj && "description" in obj && "faculty" in obj && "credits" in obj;
};

const checkIsAdmin = (res: Response): string | undefined => {
  const adminId = res.locals["id"];
  if (!adminId) {
    res.send({ error: "Unauthroized request" });
    return;
  }
  return adminId;
};

const editCourseApis = (router: Router, cl: DatabaseClient) => {
  Operations.init(cl);

  //Use admin auth on all these routes
  router.use(["/courses/:facId", "/course", "/course/:courseId"], Aauth);

  router.get("/courses/:facId", async (req, res) => {
    const adminId = checkIsAdmin(res);
    if (!adminId) {
      return;
    }
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

  router.post("/course", async (req, res) => {
    const adminId = checkIsAdmin(res);
    if (!adminId) {
      return;
    }
    try {
      const body = req.body;
      if (!containsCourseData(body)) {
        res.status(400).send({ error: "Missing Fields" });
        return;
      }
      await Operations.addCourse({ ...body, faculty: new ObjectId(body.faculty) }, adminId)
        .then(
          () => {
            res.send();
          },
          (error) => {
            res.status(400).send({ error });
          }
        )
        .catch((e) => {
          if (e === "Course with the given code already exists") {
            res.status(400).send({ error: e });
          } else {
            res.status(500).send({ error: "Server error" });
          }
        });
    } catch (e) {
      res.status(500).send({ error: "Server error" });
    }
  });

  router.put("/course/:courseId", async (req, res) => {
    const adminId = checkIsAdmin(res);
    if (!adminId) {
      return;
    }
    try {
      if (!req.params.courseId) {
        res.status(400).send({ error: "Missing course id" });
      }
      const body = req.body;
      delete body.color;
      delete body._id;
      delete body.id;
      await Operations.updateCourse(req.params.courseId, {
        ...body,
        faculty: new ObjectId(body.faculty)
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

  router.delete("/course/:courseId", async (req, res) => {
    const adminId = checkIsAdmin(res);
    if (!adminId) {
      return;
    }
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
