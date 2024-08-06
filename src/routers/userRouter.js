import express from "express";
import {
  publicProfile,
  myPage,
  getProfileEdit,
  postProfileEdit,
  logout,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import { protectorMiddleware, avatarUpload } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/myPage", protectorMiddleware, myPage);
userRouter
  .route("/profile-edit")
  .all(protectorMiddleware)
  .get(getProfileEdit)
  .post(avatarUpload.single("avatarUrl"), postProfileEdit);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/:id", protectorMiddleware, publicProfile);
export default userRouter;
