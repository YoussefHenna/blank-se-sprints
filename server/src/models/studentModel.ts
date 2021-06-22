import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    admissionYear: {type: Number},
    semester: {type: Number, min: 1},
    enrolledCoursesId: {type: Array},
    facultyID: {type: ObjectId},
    username: {type: String, required: true, unique: true},
    password: {type: String, require: true},
})

const Student = mongoose.model('student', studentSchema)

module.exports = Student;