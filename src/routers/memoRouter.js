import express from "express";
import {
  memoPage,
  memoSearch,
  getMemoUpload,
  postMemoUpload,
  memoWatch,
  getMemoEdit,
  postMemoEdit,
  memoDelete,
} from "../controllers/memoController";

const memoRouter = express.Router();

memoRouter.get("/", memoPage);
memoRouter.route("/upload").get(getMemoUpload).post(postMemoUpload);
memoRouter.get("/:id([0-9a-f]{24})", memoWatch);
memoRouter.route("/:id([0-9a-f]{24})/edit").get(getMemoEdit).post(postMemoEdit);
memoRouter.get("/:id([0-9a-f]{24})/delete", memoDelete);
memoRouter.get("/search", memoSearch);

export default memoRouter;
