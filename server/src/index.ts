import express from "express";
import cors from "cors";
import DatabaseClient from "./database";
import testAPIs from "./test/apis"; //this is only used for testing
import scheduleAPIs from "./schedule/apis";
import editCourseAPIs from "./editcourse/apis";
import gradesAPIs from "./grades/apis";
import miscellaneousAPIs from "./misc/apis";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import applyApis from "./apply/apis";

/**
 * To start server: run command 'yarn start' from the terminal
 *
 * Include any database operations in the database.ts file, and export functions to use here
 */
const app = express();

const publicRouters = express.Router() //routers that don't need token authentication (what you can do when not logged in (guest) ) , apply, sign in, register. etc..
const restrictedRouters = express.Router() //routers that require token authentication (what you can do only as a logged in user ), student and admin APIs like schedule, grades, etc

app.use(express.json());
app.use(cookieParser());
app.use(cors());


//setting up routes
app.use(publicRouters)
app.use(restrictedRouters)
app.use("/auth", require("./routers/userRouter"));
//app.use("/test", require("./routers/testRouter"));

const port = 3500;
const dbUri =
  "mongodb+srv://BlankDb:wZPr633H2zbKyDm@cluster0.btku3.mongodb.net/blank-db?retryWrites=true&w=majority";
const cl = new DatabaseClient(dbUri);

//Connect to database first, then start server
//Setup for APIs that use traditional mongodb way of handling things
cl.connect().then(() => {
  editCourseAPIs(restrictedRouters, cl);
  applyApis(publicRouters, cl);
  testAPIs(publicRouters, cl);
  scheduleAPIs(restrictedRouters, cl);
  gradesAPIs(restrictedRouters, cl);
  miscellaneousAPIs(restrictedRouters, cl);
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
