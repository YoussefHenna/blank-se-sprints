import express from "express";
import cors from "cors";
import DatabaseClient from "./database";
import testAPIs from "./test/apis"; //this is only used for testing
import scheduleAPIs from "./schedule/apis";
import editCourseAPIs from "./editcourse/apis";
import mongoose from 'mongoose';

/**
 * To start server: run command 'yarn start' from the terminal
 *
 * Include any database operations in the database.ts file, and export functions to use here
 */
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

const db = "mongodb+srv://BlankDb:wZPr633H2zbKyDm@cluster0.btku3.mongodb.net/blank-db?retryWrites=true&w=majority";
//Connect to database first, then start server
mongoose 
.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},
(err) => {
  if (err) return console.error(err);
  console.log("Connected To MongGod...")
}
);
// set up routes
app.use("/auth", require('./routers/userRouter'));