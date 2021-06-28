import express from "express";
import Student from "../models/studentModel";
import Instructor from "../models/instructorModel";
import Admin from "../models/adminModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { getStudentCourses } from "../test/dbOperations";

const router = express.Router();

// Register Users

router.post("/", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      password,
      passwordVerify,
      facultyID,
      admissionYear,
      enrolledCoursesId,
      semester,
      coursesId,
      key,
    } = req.body;

    // verification
    if (!username || !password || !passwordVerify)
      return res
        .status(400)
        .json({ errMsg: "Please enter in all the required fields" });

    if (password.length < 8)
      return res
        .status(400)
        .json({ errMsg: "Please enter in a password more than 8 characters" });

    if (password != passwordVerify)
      return res
        .status(400)
        .json({ errMsg: "Please enter the same password twice" });

    const existingStudent = await Student.findOne({ username });
    if (existingStudent) {
      return res.status(400).json({
        errMsg:
          "An account with this username already exist. Please choose another username.",
      });
    }
    const existingInstructor = await Instructor.findOne({ username });
    if (existingInstructor) {
      return res.status(400).json({
        errMsg:
          "An account with this username already exist. Please choose another username.",
      });
    }
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({
        errMsg:
          "An account with this username already exist. Please choose another username.",
      });
    }

    if (key === "") {
      return res.status(400).json({ errMsg: "Please enter a valid user key" });
    }

    // Password Hashing

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    let savedUser;
    let userRole;

    switch (key) {
      case "Student":
        const newStudent = new Student({
          firstName,
          lastName,
          username,
          passwordHash,
          facultyID,
          admissionYear,
          semester,
          enrolledCoursesId,
        });
        userRole = "Student"

        savedUser = await newStudent.save();
        break;
      case "Instructor":
        const newInstructor = new Instructor({
          firstName,
          lastName,
          username,
          passwordHash,
          facultyID,
          coursesId,
        });
        userRole = "Instructor"

        savedUser = await newInstructor.save();
        break;
      case "Admin":
        const newAdmin = new Admin({
          firstName,
          lastName,
          username,
          passwordHash,
        });
        userRole = "Admin"

        savedUser = await newAdmin.save();
        break;
      default:
        console.error("Please Enter the a valid user key");
    }

    // Sign the Token

    const token = jwt.sign(
      {
        user: savedUser._id,
        role : userRole,
      },
      process.env.JWT_SECRET
    );

    // Send the token in HTTP-only cookie

    res
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(2040, 5),
      })
      .send({ role: userRole });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
// log in
router.post("/login", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      password,
      facultyID,
      admissionYear,
      enrolledCoursesId,
      semester,
      coursesId,
      key,
    } = req.body;

    // Verification
    if (!username || !password)
      return res
        .status(400)
        .json({ errMsg: "Please enter in all the required fields" });

    let existingUser;
    let userRole;

    do {
      existingUser = await Student.findOne({ username });

      if (existingUser) {
        userRole = "Student";
        break;
      }

      existingUser = await Admin.findOne({ username });

      if (existingUser) {
        userRole = "Admin";
        break;
      }

      existingUser = await Instructor.findOne({ username });

      if (existingUser) {
        userRole = "Instructor";
        break;
      }

      return res.status(401).json({ errMsg: "Wrong email/password" });

    } while (0);

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!passwordCorrect) {
      return res.status(401).json({ errMsg: "Wrong email/password" });
    }

    const token = jwt.sign(
      {
        user: existingUser._id,
        role : userRole
      },
      process.env.JWT_SECRET
    );

    console.log("user role : ", userRole);

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send({role : userRole});
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Log out User
router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

// check logged In
router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.json(false);

    type MyToken = {
      user: String;
    };

    const verified = jwt.verify(token, process.env.JWT_SECRET,{algorithms : ['HS256']}) as MyToken;

    const user = verified.user;

    // res.json({
    //   bool: true,
    //   jwt: user,
    // });
    res.send(true);
  } catch (err) {
    res.json(false);
  }
});

// change password
router.post("/changePassword", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      password,
      passwordConfirm,
      facultyID,
      admissionYear,
      enrolledCoursesId,
      semester,
      coursesId,
      key,
    } = req.body;

    // Verification
    if (!username || !password || !passwordConfirm)
      return res
        .status(400)
        .json({ errMsg: "Please enter all the required fields" });

    if (password.length < 8)
      return res
        .status(400)
        .json({ errMsg: "Please enter in a password more than 8 characters" });

    if (password != passwordConfirm)
      return res
        .status(400)
        .json({ errMsg: "Please enter the same password twice" });

    if (key === "") {
      return res.status(400).json({ errMsg: "Please enter a valid user key" });
    }

    // Password Hashing

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Change password in DB

    let update;

    switch (key) {
      case "Student":
        update = await Student.findOneAndUpdate({ username }, { passwordHash });
        if (!update) {
          return res.status(401).json({ errMsg: "Not Done brother" });
        }
        break;
      case "Teacher":
        update = await Instructor.findOneAndUpdate(
          { username },
          { passwordHash }
        );
        if (!update) {
          return res.status(401).json({ errMsg: "Not Done brother" });
        }
        break;
      case "Admin":
        update = await Admin.findOneAndUpdate({ username }, { passwordHash });
        if (!update) {
          return res.status(401).json({ errMsg: "Not Done brother" });
        }
        break;
      default:
        console.error("Please Enter the a valid user key");
    }

    // clear the user's token (log-out)
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
      })
      .send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

module.exports = router;
