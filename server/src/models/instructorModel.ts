import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const instructorSchema = new mongoose.Schema({
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    username: {type: String, required: true, unique: true},
    passwordHash: {type: String, require: true},
    coursesID: {type: Array, default: [0]},
    facultyID: {type: String, default: "60cc8205111a71a2f67da38e"}
})

const Instructor = mongoose.model('instructor', instructorSchema)

module.exports = Instructor;