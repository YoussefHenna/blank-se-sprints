import {
  Session,
  Schedule,
  FreeSlotsRequest,
  Sessions,
  SessionsToBeAdded,
} from "../../SharedObjects/schedule";
import { Router } from "express";
import DatabaseClient from "./../database";
import * as Operations from "./dbOperations";
import * as Exceptions from "./exceptions";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const scheduleAPIs = (router: Router, cl: DatabaseClient) => {
  router.get("/available-slots/:slotsReq", async (req, res) => {
    try {
      const slotsReq: FreeSlotsRequest = JSON.parse(
        decodeURIComponent(req.params.slotsReq)
      );
      const result = await Operations.findAvailableSlots(cl, slotsReq);
      console.log(slotsReq);
      res.statusCode = 200;
      res.send(result);
    } catch (e) {
      console.error(e);
      res.statusCode = 500;
      res.send({ msg: "internal server error" });
    }
  });

  router.post("/sessions", async (req, res) => {
    try {
      console.log(req.body);
      const sessions: Sessions = <Sessions>req.body;
      await Operations.addSessionsToSlots(cl, new SessionsToBeAdded(sessions));
      res.statusCode = 200;
      res.send({ msg: "success" });
    } catch (e) {
      console.error(e);
      res.statusCode = 500;
      res.send({ msg: "internal server error" });
    }
  });

  router.get("/schedule/student-group/:id", async (req, res) => {
    try {
      const id = new ObjectId(req.params.id);
      const result = await Operations.getSchedule(cl, "studentGroupId", id);
      res.statusCode = 200;
      res.send(result);
    } catch (e) {
      console.error(e);
      res.statusCode = 500;
      res.send({ msg: "internal server error" });
    }
  });

  router.get("/schedule/instructor/:id", async (req, res) => {
    try {
      const id = new ObjectId(req.params.id);
      const result = await Operations.getSchedule(cl, "instructorId", id);
      res.statusCode = 200;
      res.send(result);
    } catch (e) {
      console.error(e);
      res.statusCode = 500;
      res.send({ msg: "internal server error" });
    }
  });

  router.get("/schedule/locations", async (req, res) => {
    try {
      const result = await Operations.getLocations(cl);
      res.statusCode = 200;
      res.send(result);
    } catch (e) {
      console.error(e);
      res.statusCode = 500;
      res.send({ msg: "internal server error" });
    }
  });

  router.delete("/sessions", async (req, res) => {
    try {
      const sessionsId = req.body.map((sessionId) => new ObjectId(sessionId));
      const result = await Operations.deleteSessions(cl, sessionsId);
      res.statusCode = 200;
      res.send({ msg: "success" });
    } catch (e) {
      console.error(e);
      res.statusCode = 500;
      res.send({ msg: "internal server error" });
    }
  });
};

export default scheduleAPIs;
