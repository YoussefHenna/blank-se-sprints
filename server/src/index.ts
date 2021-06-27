import express from "express";
import cors from "cors";
import DatabaseClient from "./database";
import testAPIs from "./test/apis"; //this is only used for testing
import scheduleAPIs from "./schedule/apis";
import editCourseAPIs from "./editcourse/apis";
import gradesAPIs from "./grades/apis"
import miscellaneousAPIs from "./misc/apis"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

/**
 * To start server: run command 'yarn start' from the terminal
 *
 * Include any database operations in the database.ts file, and export functions to use here
 */
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
const port = 3500;
const dbUri =
  "mongodb+srv://BlankDb:wZPr633H2zbKyDm@cluster0.btku3.mongodb.net/blank-db?retryWrites=true&w=majority";
const cl = new DatabaseClient(dbUri);

//Connect to database first, then start server
//Setup for APIs that use traditional mongodb way of handling things
cl.connect().then(() => {
  editCourseAPIs(app, cl);
  testAPIs(app, cl);
  scheduleAPIs(app, cl);
  gradesAPIs(app, cl);
  miscellaneousAPIs(app, cl);
  console.log(`Server running at http://localhost:${port}`);
  app.listen(port);
});
////////////////////////////////////////////////////////////////////

//Setup for APIs that use Mongoose library////////////////////
mongoose.connect(
  dbUri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected To MongGod...");
  }
);
// set up routes
app.use("/auth", require("./routers/userRouter"));
//app.use("/test", require("./routers/testRouter"));
///////////////////////////////////////////////////////////////
