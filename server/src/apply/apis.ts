import { Express } from "express";
import DatabaseClient from "../database";
import * as Operations from "./dbOperations";

const containsApplyData = (obj: any) => {
  return (
    "personalInformation" in obj &&
    "educationHistory" in obj &&
    "majorSelection" in obj
  );
};

const applyApis = (app: Express, cl: DatabaseClient) => {
  Operations.init(cl);

  app.post("/apply", async (req, res) => {
    try {
      const body = req.body;
      if (!containsApplyData(body)) {
        res.status(400).send({ error: "Missing Fields" });
        return;
      }
      await Operations.addApplication(body)
        .then(
          () => {
            res.send();
          },
          (error) => {
            res.status(400).send({ error });
          }
        )
        .catch((e) => {
          if (
            e === "Application with the same email previously submitted" ||
            e === "Application with the same national ID previously submitted"
          ) {
            res.status(400).send({ error: e });
          } else {
            res.status(500).send({ error: "Server error" });
          }
        });
    } catch (e) {
      res.status(500).send({ error: "Server error" });
    }
  });
};

export default applyApis;
