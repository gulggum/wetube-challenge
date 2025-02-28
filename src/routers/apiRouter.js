//api는 백엔드가 템플릿을 렌더링하지 않을때 프론트와 백엔드가 통신하는 방법

import express from "express";
import { registerView, createComment } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
//ㄴ>프론트엔드에서 자바스크립트로 호출하는 URL(URL을 바꾸진 않는다)
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);

export default apiRouter;
