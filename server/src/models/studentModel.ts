import { ObjectID } from 'mongodb';
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    username: {type: String, required: true, unique: true},
    passwordHash: {type: String, require: true},
    admissionYear: {type: Number, default: 2021},
    semester: {type: Number, default: 20},
    enrolledCoursesId: {type: Array ,  default: [0]},
    facultyID: {type: String, default: "60cc8205111a71a2f67da38e"}
  
})

const Student = mongoose.model('student', studentSchema)

module.exports = Student;