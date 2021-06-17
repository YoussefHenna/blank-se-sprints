import express from "express";
import { Database } from "./database";
import * as testAPIs from "./testAPIs"; //this is only used for testing

/**
 * To start server: run command 'yarn start' from the terminal
 *
 * Include any database operations in the database.ts file, and export functions to use here
 */
const app = express();
const port = 4000;
const database = new Database(
  "mongodb://localhost:27017?retryWrites=true&w=majority"
);

//Sample get request to test it works
app.get("/", async (req, res) => {
  res.send("Server works!");
});

testAPIs.addStudentTest(app, database);

console.log(`Server running at http://localhost:${port}`);
app.listen(port);
