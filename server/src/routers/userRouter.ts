const router = require('express').Router();
const Student = require("../models/adminModel");
const Instructor = require("../models/instructorModel");
const Admin = require("../models/adminModel");
const bcrypt = require('bcryptjs');

router.post("/", async (req, res) => {
    try {
    const {firstName, lastName, username, password, passwordVerify} = req.body;
       
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

    // Password Hashing

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    console.log(passwordHash);

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

module.exports = router;