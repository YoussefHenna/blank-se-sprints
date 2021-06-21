import express from "express";
import DatabaseClient from "./database";
import testAPIs from "./test/apis"; //this is only used for testing
import scheduleAPIs from "./schedule/apis";
import editCourseAPIs from "./editcourse/apis";

/**
 * To start server: run command 'yarn start' from the terminal
 *
 * Include any database operations in the database.ts file, and export functions to use here
 */
const app = express();
app.use(express.json());
const port = 4000;
const cl = new DatabaseClient(
  "mongodb+srv://BlankDb:wZPr633H2zbKyDm@cluster0.btku3.mongodb.net/blank-db?retryWrites=true&w=majority"
);

//Connect to database first, then start server
cl.connect().then(() => {
  editCourseAPIs(app, cl);
  testAPIs(app, cl);
  scheduleAPIs(app, cl);

  console.log(`Server running at http://localhost:${port}`);
  app.listen(port);
});
