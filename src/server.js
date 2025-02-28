import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import memoRouter from "./routers/memoRouter";
import apiRouter from "./routers/apiRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");
app.use(logger);
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extend: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SCRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);
//ㄴ>session이라는 미들웨어가 쿠키 전송

app.use((req, res, next) => {
  res.locals.sexy = "YOU";
  req.sessionStore.all((error, sessions) => {
    // console.log(sessions);
    next();
  });
});

app.use(flash());
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/memo", memoRouter);
app.use("/api", apiRouter);

export default app;
