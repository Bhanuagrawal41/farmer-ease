// import mongoose from "mongoose";

// const noticeSchema = new mongoose.Schema({
//   id: { type: String, unique: true },
//   title: String,
//   date: String,
//   link: String,
//   source: String,
//   type: String,
//   fetched_at: String,
// });

// export default mongoose.model("Notice", noticeSchema);
import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: String,
  link: String,
  date: String,
  source: String,
}, { timestamps: true });

export default mongoose.model("Notice", noticeSchema);