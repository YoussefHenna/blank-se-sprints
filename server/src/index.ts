import express from "express";
import * as db from "./database";

/**
 * To start server: run command 'yarn start' from the terminal
 *
 * Include any database operations in the database.ts file, and export functions to use here
 */
const app = express();
const port = 4000;
db.initDb();

//Sample get request to test it works
app.get("/", (req, res) => {
  res.send("Server works!");
});

console.log(`Server running at http://localhost:${port}`);
app.listen(port);
