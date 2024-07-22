import express from "express";
import morgan from "morgan";
import session from "express-session";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import memoRouter from "./routers/memoRouter";
import { localsMiddleware } from "./localsMiddleware";

const app = express();
const logger = morgan("dev");
app.use(logger);
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extend: true }));

app.use(
  session({
    secret: "hello",
    resave: true,
    saveUninitialized: true,
  })
);
//ㄴ>session이라는 미들웨어가 쿠키 전송

app.use((req, res, next) => {
  res.locals.sexy = "YOU";
  req.sessionStore.all((error, sessions) => {
    console.log(sessions);
    next();
  });
});

app.use(localsMiddleware);
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/memo", memoRouter);

export default app;
