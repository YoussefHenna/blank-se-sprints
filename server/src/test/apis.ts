import { Express } from "express";
import DatabaseClient from "./../database";
import * as Operations from "./dbOperations";

// APIs that can be used for testing

// this is a playground where you can test code

// you can also follow this as a guide for other APIs

const testAPIs = (app: Express, cl: DatabaseClient) => {

  app.get('/get-all-students-test',async (req,res)=>{

    try {
      const students = await Operations.getAllStudents(cl);
      res.send(students)
    }

    catch (e){
      console.log(e)
      res.statusCode = 500;
      res.send({msg:"internal server error"})
    }

  })
};

export default testAPIs;
