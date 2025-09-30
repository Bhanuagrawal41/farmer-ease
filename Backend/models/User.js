import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  mobile: { type: String, unique: true },
  password: String,
  language: String,
  location: String,
  crops: String,
});

export default mongoose.model("User", userSchema);
