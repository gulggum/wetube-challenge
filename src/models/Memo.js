import mongoose from "mongoose";

export const formatHashtags = (hashtags) =>
  hashtags.split(",").map((word) => (startsWith("#") ? word : `#${word}`));

const memoSchema = new mongoose.Schema({
  author: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  hashtags: { type: String, trim: true },
  writeTime: { type: Date, default: Date.now },
});

const memo = mongoose.model("Memo", memoSchema);

export default memo;
