import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { findUserType } from "./Helpers";
dotenv.config();
// Teacher Authentication MiddleWare

async function Tauth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ errMsg: "Unauthorized User" });
      return;
    }

    type MyToken = {
      user: string;
    };

    const verified = jwt.verify(token, process.env.JWT_SECRET) as MyToken;

    const type = await findUserType(verified.user);
    if (type !== "instructor") {
      res.status(401).json({ errMsg: "Unauthorized User" });
      return;
    }

    res.locals["id"] = verified.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errMsg: "Unauthorized User" });
  }
}

export default Tauth;
