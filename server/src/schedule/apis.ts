import { StudentSession, StudentSchedule } from "./../SharedObjects/schedule";
import { Express } from "express";
import DatabaseClient from "./../database";
import * as Operations from "./dbOperations";
import * as Exceptions from "./exceptions";
import { ObjectId } from "Mongodb";

const scheduleAPIs = (app: Express, cl: DatabaseClient) => {
  app.post("/student-schedule/", async (req, res) => {
    try {
      console.log(req.body);
      const sid = new ObjectId(req.body.studentId); //extract student id from the url and convert it to an ObjectId
      await Operations.initializeStudentSchedule(cl, new ObjectId(sid));
      res.send({ success: true });
    } catch (e) {
      if (e instanceof Exceptions.ScheduleAlreadyExists) {
        res.statusCode = 400;

        res.send({
          success: false,
          msg: e.message,
        });
      } else {
        console.log(e);
        res.statusCode = 500;

        res.send({
          success: false,
          msg: "internal server error",
        });
      }
    }
  });
};

export default scheduleAPIs;
