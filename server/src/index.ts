import express from "express";
import cors from "cors";
import DatabaseClient from "./database";
import testAPIs from "./test/apis"; //this is only used for testing
import scheduleAPIs from "./schedule/apis";
import editCourseAPIs from "./editcourse/apis";
import gradesAPIs from "./grades/apis";
import miscellaneousAPIs from "./misc/apis";
import publicMiscellaneousAPIs from "./miscPublic/apis";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import applyApis from "./apply/apis";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/**
 * To start server: run command 'yarn start' from the terminal
 *
 * Include any database operations in the database.ts file, and export functions to use here
 */
const app = express();
app.use(express.json());
app.use(cookieParser());

const publicRouters = express.Router(); //routers that don't need token authentication (what you can do when not logged in (guest) ) , apply, sign in, register. etc..
const restrictedRouters = express.Router(); //routers that require token authentication (what you can do only as a logged in user ), student and admin APIs like schedule, grades, etc
const port = process.env.PORT || 3500;
const clientURL = process.env.CLIENT_URL || "http://localhost:3000";
const serverURL = process.env.URL || "http://localhost";

app.use(express.json());
app.use(cookieParser());
//TODO: change with url of hosted react project
app.use(
  cors({
    origin: clientURL,
    credentials: true
  })
);

//setting up routes
app.use(
  cors({
    credentials: true,
    origin: clientURL
  })
);
app.use("/public", publicRouters);
app.use("/restricted", restrictedRouters);
restrictedRouters.use((req, res, next) => {
  if (!req.cookies.token) {
    res.status(401).send({ msg: "could not verify token" });
    return;
  }

  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error(err);
      res.status(401).send({ msg: "could not verify token" });
      return;
    }

    next();
  });
});

//app.use((req,res,next)=>{
// res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3500');
//  next()
//})

app.use("/auth", require("./routers/userRouter"));
//app.use("/test", require("./routers/testRouter"));

const dbUri = "mongodb+srv://BlankDb:wZPr633H2zbKyDm@cluster0.btku3.mongodb.net/blank-db?retryWrites=true&w=majority";
const cl = new DatabaseClient(dbUri);

//Connect to database first, then start server
//Setup for APIs that use traditional mongodb way of handling things
cl.connect().then(() => {
  editCourseAPIs(restrictedRouters, cl);
  applyApis(publicRouters, cl);
  testAPIs(publicRouters, cl);
  scheduleAPIs(restrictedRouters, cl);
  gradesAPIs(restrictedRouters, cl);
  miscellaneousAPIs(publicRouters, cl);
  publicMiscellaneousAPIs(publicRouters, cl);
  console.log(`Server running at ${serverURL}:${port}`);
  app.listen(port);
});

////////////////////////////////////////////////////////////////////

//Setup for APIs that use Mongoose library////////////////////
mongoose.connect(
  dbUri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to database...");
  }
);
