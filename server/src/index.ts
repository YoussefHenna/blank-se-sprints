import express from "express";
import DatabaseClient from "./database";
import testAPIs from "./test/apis"; //this is only used for testing

/**
 * To start server: run command 'yarn start' from the terminal
 *
 * Include any database operations in the database.ts file, and export functions to use here
 */
const app = express();
const port = 4000;
const cl = new DatabaseClient(
  "mongodb://localhost:27017?retryWrites=true&w=majority"
);

//Sample get request to test it works
app.get("/", async (req, res) => {
  res.send("Server works!");
});

testAPIs(app, cl);

console.log(`Server running at http://localhost:${port}`);
app.listen(port);
