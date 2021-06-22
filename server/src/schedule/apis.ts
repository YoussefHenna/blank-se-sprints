import { Session, Schedule, FreeSlotsRequest } from "../../../SharedObjects/schedule";
import { Express } from "express";
import DatabaseClient from "./../database";
import * as Operations from "./dbOperations";
import * as Exceptions from "./exceptions";
import { ObjectId } from "mongodb";

const scheduleAPIs = (app: Express, cl: DatabaseClient) => {

    app.get('/available-slots/:slotsReq',async (req,res)=>{

        try {
            console.log("PARAM : ",req.params.slotsReq)
            const slotsReq : FreeSlotsRequest = JSON.parse(decodeURIComponent(req.params.slotsReq))
            const result = await Operations.findAvailableSlots(cl,slotsReq)
            res.statusCode = 500
            res.send(result)
        }
        catch (e){
            console.error(e)
            res.statusCode = 500
            res.send({msg : 'internal server error'})
        }

    })

};

export default scheduleAPIs;
