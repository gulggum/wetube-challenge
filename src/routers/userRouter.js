import express from "express";
import {
  profile,
  getProfileEdit,
  postProfileEdit,
  logout,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/profile", protectorMiddleware, profile);
userRouter
  .route("/profile-edit")
  .all(protectorMiddleware)
  .get(getProfileEdit)
  .post(postProfileEdit);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);

export default userRouter;
