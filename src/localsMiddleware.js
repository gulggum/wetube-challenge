export const localsMiddleware = (req, res, next) => {
  console.log(req.session);
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user;
  //ㄴ> locals middleware덕분에 loggedInUser공유로(로그인하지 않으면 undifind)
  console.log(res.locals);
  next();
};
