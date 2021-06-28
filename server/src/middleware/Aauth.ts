import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
// Admin Authentication MiddleWare

function Aauth(req, res, next) {
  try {
    const token = req.cookies.token;
    const { key } = req.body;

    if (!key || key === "" || key !== "Admin")
      return res.status(400).json({ errMsg: "Please enter a valid key" });

    if (!token) return res.status(401).json({ errMsg: "Unauthorized User" });

    type MyToken = {
      user: String;
    };

    const verified = jwt.verify(token, process.env.JWT_SECRET) as MyToken;

    req.user = verified.user;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errMsg: "Unauthorized User" });
  }
}

export default Aauth;
