import express from "express";
import DatabaseClient from "./database";
import testAPIs from "./test/apis"; //this is only used for testing
import scheduleAPIs from "./schedule/apis"; 

/**
 * To start server: run command 'yarn start' from the terminal
 *
 * Include any database operations in the database.ts file, and export functions to use here
 */
const app = express();
app.use(express.json())
const port = 4000;
const cl = new DatabaseClient(
  "mongodb+srv://BlankDb:wZPr633H2zbKyDm@cluster0.btku3.mongodb.net/blank-db?retryWrites=true&w=majority"
);

//Sample get request to test it works
app.get("/", async (req, res) => {
  res.send("Server works!");
});

testAPIs(app, cl);
scheduleAPIs(app, cl);

console.log(`Server running at http://localhost:${port}`);
app.listen(port);
