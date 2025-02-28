import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  avatarUrl: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

// 비밀번호 해시화해주는 미들웨어
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const user = mongoose.model("User", userSchema);

export default user;
