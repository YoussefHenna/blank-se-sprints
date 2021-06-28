import { Router } from "express";
import { Instructor, StudentGroup } from "../../../SharedObjects/users";
import * as Operations from "./dbOperations";
import DatabaseClient from "./../database";

const miscellaneousAPIs = (router: Router, cl: DatabaseClient) => {
  router.get("/student-groups", async (req, res) => {
    try {
      const studentGroups: StudentGroup[] = await Operations.getStudentGroups(
        cl
      );
      res.statusCode = 200;
      res.send(studentGroups);
    } catch (e) {
      console.error(e);
      res.statusCode = 500;
      res.send({ msg: "internal server error" });
    }
  });
  router.get("/instructors", async (req, res) => {
    try {
      const instructors: Instructor[] = await Operations.getAllInstructors(cl);
      res.statusCode = 200;
      res.send(instructors);
    } catch (e) {
      console.error(e);
      res.statusCode = 500;
      res.send({ msg: "internal server error" });
    }
  });
};

export default miscellaneousAPIs;
