const router = require('express').Router();
const Student = require("../models/studentModel");
const Instructor = require("../models/instructorModel");
const Admin = require("../models/adminModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Users

router.post("/", async (req, res) => {
    try {
    const {firstName, lastName, username, password, passwordVerify, facultyID, admissionYear, enrolledCoursesId, semester, coursesId, key} = req.body;
       
    // verification
    if (!username || !password || !passwordVerify)
    return res
      .status(400)
      .json({errMsg: "Please enter in all the required fields"});

    if (password.length < 8)
    return res
      .status(400)
      .json({errMsg: "Please enter in a password more than 8 characters"});

    if (password != passwordVerify)
    return res
    .status(400)
    .json({errMsg: "Please enter the same password twice"});

    const existingStudent = await Student.findOne({ username });
    if (existingStudent) {
        return res
        .status(400)
        .json({errMsg: "An account with this username already exist. Please choose another username."});
    }
    const existingInstructor = await Instructor.findOne({ username });
    if (existingInstructor){
        return res
        .status(400)
        .json({errMsg: "An account with this username already exist. Please choose another username."});
    }
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
        return res
        .status(400)
        .json({errMsg: "An account with this username already exist. Please choose another username."});
    }

    if (key === ""){
        return res
        .status(400)
        .json({errMsg: "Please enter a valid user key"});
    }

    // Password Hashing

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    let savedUser;

    switch (key) {
        case "Student":
            const newStudent = new Student ({
                firstName,
                lastName,
                username,
                passwordHash,
                facultyID,
                admissionYear,
                semester,
                enrolledCoursesId
            });
        
            savedUser = await newStudent.save();
            break;
        case "Teacher":
            const newInstructor = new Instructor ({
                firstName,
                lastName,
                username,
                passwordHash,
                facultyID,
                coursesId
            });
        
            savedUser = await newInstructor.save();
            break;
        case "Admin":
            const newAdmin = new Admin ({
                firstName,
                lastName,
                username,
                passwordHash,
                coursesId
            });
        
            savedUser = await newAdmin.save();
            break;
        default:
            console.error("Please Enter the a valid user key");
    }

    // Sign the Token

    const JWT_SECRET =  "thH],!aQ?$n]J*^L!4^8sR.p*/Kaz{EY)7eqdJP$";
    const token = jwt.sign({
        user: savedUser._id
    },JWT_SECRET);

    // Send the token in HTTP-only cookie
    
    res.cookie("token", token, {
        httpOnly: true,
    }).send();

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

module.exports = router;