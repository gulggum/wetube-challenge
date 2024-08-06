import express from "express";
import {
  profile,
  getProfileEdit,
  postProfileEdit,
  logout,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import { protectorMiddleware, uploadFiles } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/:id", protectorMiddleware, profile);
userRouter
  .route("/:id([0-9a-f]{24})/profile-edit")
  .all(protectorMiddleware)
  .get(getProfileEdit)
  .post(uploadFiles.single("avatarUrl"), postProfileEdit);
userRouter
  .route("/:id([0-9a-f]{24})/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
export default userRouter;
