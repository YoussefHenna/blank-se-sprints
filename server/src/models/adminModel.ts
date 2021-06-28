import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, require: true },
});

const Admin = mongoose.model("admin", adminSchema);

export default Admin;
