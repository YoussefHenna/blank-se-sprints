import express from "express";

/**
 * To start server: run command 'yarn start' from the terminal
 */

const app = express();
const port = 4000;

//Sample get request to test it works
app.get("/", (req, res) => {
  res.send("Server works!");
});

console.log(`Server running at http://localhost:${port}`);
app.listen(port);
