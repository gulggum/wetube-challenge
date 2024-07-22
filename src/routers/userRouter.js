import express from "express";
import { edit, logout } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);

export default userRouter;
