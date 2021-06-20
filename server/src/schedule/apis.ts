import { Session, Schedule } from "./../SharedObjects/schedule";
import { Express } from "express";
import DatabaseClient from "./../database";
import * as Operations from "./dbOperations";
import * as Exceptions from "./exceptions";
import { ObjectId } from "Mongodb";

const scheduleAPIs = (app: Express, cl: DatabaseClient) => {
};

export default scheduleAPIs;
