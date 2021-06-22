import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, require: true},
    coursesId: {type: Array}
})

const Admin = mongoose.model('admin', adminSchema)

module.exports = Admin;