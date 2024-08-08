import mongoose from "mongoose";

//해쉬테그를 미리 변환해주는 미들웨어(2)
export const formatHashtags = (hashtags) =>
  hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  fileUrl: { type: String, required: true },
  description: { type: String, required: true, trim: true },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
  },
  comments: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" },
  ],
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

//해쉬테그를 미리 변환해주는 미들웨어(1)
// videoSchema.pre("save", async function () {
//  this.hashtags = this.hashtags[0]
//    .split(",")
//    .map((word) => (word.startsWith("#") ? word : `#${word}`));
//});

const video = mongoose.model("Video", videoSchema);

export default video;
