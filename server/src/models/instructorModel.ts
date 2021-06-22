import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const instructorSchema = new mongoose.Schema({
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, require: true},
    coursesID: {type: Array},
    facultyID: {type: ObjectId}
})

const Instructor = mongoose.model('instructor', instructorSchema)

module.exports = Instructor;