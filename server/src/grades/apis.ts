import { Session, Schedule, FreeSlotsRequest, Sessions, SessionsToBeAdded } from "../../../SharedObjects/schedule";
import { Express } from "express";
import DatabaseClient from "../database";
// import * as Operations from "./dbOperations";
// import * as Exceptions from "./exceptions";
import { ObjectId } from "mongodb";
import Student from "../models/studentModel";

const gradesAPIs = (app: Express, cl: DatabaseClient) => {

  app.get('/student/grades', async (req, res) => {
    try {
      // const id = req.params.id
      const data = await Student.findById("60cc811b111a71a2f67da382") //use cookies / token
      res.send(data)

    } catch (e) {
      res.status(500).send({ error: "Server error" });
    }
  })

  app.patch('/student/grades', async (req, res) => {
    try {
      const {grades} = req.body
      console.log(req.body)
      const data = await Student.findByIdAndUpdate("60cc811b111a71a2f67da382" , {firstName : grades} , {new:true}) //firstName should be replaced by grades
      res.send(data)

    } catch (e) {
      console.log(e)
      res.status(500).send({ error: "Server error" });
    }
  })


}
export default gradesAPIs; 