import { Router } from "express";
import DatabaseClient from "../database";
import * as Operations from "./dbOperations";
import { ObjectId } from "mongodb";


const publicMiscellaneousAPIs = (router: Router, cl: DatabaseClient) => {

  Operations.init(cl)

  router.get("/faculties", async (req, res) => {
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

}

export default publicMiscellaneousAPIs 
