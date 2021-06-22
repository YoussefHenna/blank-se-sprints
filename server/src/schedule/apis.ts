import { Session, Schedule, FreeSlotsRequest, Sessions, SessionsToBeAdded } from "../../../SharedObjects/schedule";
import { Express } from "express";
import DatabaseClient from "./../database";
import * as Operations from "./dbOperations";
import * as Exceptions from "./exceptions";
import { ObjectId } from "mongodb";

const scheduleAPIs = (app: Express, cl: DatabaseClient) => {

    app.get('/available-slots/:slotsReq',async (req,res)=>{

        try {
            const slotsReq : FreeSlotsRequest = JSON.parse(decodeURIComponent(req.params.slotsReq))
            const result = await Operations.findAvailableSlots(cl,slotsReq)
            console.log(slotsReq)
            res.statusCode = 200
            res.send(result)
        }
        catch (e){
            console.error(e)
            res.statusCode = 500
            res.send({msg : 'internal server error'})
        }

    })


  app.post('/sessions',async (req,res)=>{

        try {
          console.log(req.body)
          const sessions : Sessions = <Sessions> req.body
          await Operations.addSessionsToSlots(cl,new SessionsToBeAdded(sessions))
          res.statusCode = 200
          res.send({msg : 'success'})
        }
        catch (e){
            console.error(e)
            res.statusCode = 500
            res.send({msg : 'internal server error'})
        }
  })

};

export default scheduleAPIs;
