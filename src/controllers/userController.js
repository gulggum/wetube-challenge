import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = async (req, res) => {
  return res.render("join", { pageTitle: "회원가입" });
};

export const postJoin = async (req, res) => {
  const { username, name, email, address, password, password2 } = req.body;
  if (password !== password2) {
    return res.status(400).render("join", {
      pagetitle: "회원가입",
      errorMessage: "비밀번호가 일치하지 않습니다.",
    });
  }
  const user = await User.findOne({ username });
  if (user) {
    return res.status(400).render("join", {
      pageTitle: "회원가입",
      errorMessage: "이미 등록된 아이디 입니다.",
    });
  }
  await User.create({
    username,
    name,
    email,
    address,
    password,
    password2,
  });
  return res.redirect("/");
};
export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "로그인" });
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle: "로그인",
      errorMessage: "등록되지 않은 아이디 입니다.",
    });
  }
  const passwordOk = await bcrypt.compare(password, user.password);
  if (!passwordOk) {
    return res.status(400).render("login", {
      pageTitle: "로그인",
      errorMessage: "비밀번호가 일치하지 않습니다.",
    });
  }
  //유저가 로그인하면 그 유저에 대한 정보를 세션에 담는다
  req.session.loggedIn = true;
  req.session.user = user;
  //위 user는 const user = await User.findOne({ username });
  return res.redirect("/");
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const edit = (req, res) => {
  return res.render("login");
};
