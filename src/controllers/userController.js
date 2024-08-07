import User from "../models/User";
import Video from "../models/Video";
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

// 프로필 & 프로필 수정
export const publicProfile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("videos");
  if (!user) {
    return res
      .status(404)
      .render("404", { pageTitle: "유저를 찾을수 없습니다." });
  }
  const videos = await Video.find({ owner: user._id });
  return res.render("users/profile", {
    pageTitle: `${user.name}의 프로필`,
    user,
    videos,
  });
};

export const myPage = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  return res.render("users/myPage", {
    pageTitle: `My Page`,
  });
};

export const getProfileEdit = (req, res) => {
  const user = req.session.user.name;
  return res.render("users/profile-edit", {
    pageTitle: `${user}의 프로필`,
  });
};
export const postProfileEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { name, email, address },
    file,
  } = req;

  const changeEmail = await User.exists({ email });
  if (changeEmail && req.session.user.email !== email) {
    return res.status(400).render("users/profile-edit", {
      pageTitle: `${user.name}의 프로필`,
      errorMessage: "이미 사용중인 E-mail 입니다.",
    });
  }

  const updateUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      name,
      email,
      address,
    },
    { new: true }
  );
  req.session.user = updateUser;
  return res.redirect("/users/myPage");
};

// 비밀번호 수정

export const getChangePassword = (req, res) => {
  return res.render("users/change-password", { pageTitle: "비밀번호 변경" });
};

export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPasswordConfirmation },
  } = req;

  const user = await User.findById(_id);
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) {
    return res.status(400).render("users/change-password", {
      pageTitle: "비밀번호 변경",
      errorMessage: "기존 비밀번호가 일치하지 않습니다.",
    });
  }

  if (newPassword !== newPasswordConfirmation) {
    return res.status(400).render("users/change-password", {
      pageTitle: "비밀번호 변경",
      errorMessage: "새로운 비밀번호가 일치하지 않습니다.",
    });
  }
  user.password = newPassword;
  await user.save(); // save()해주면 pre save middleware작동 (새로운 비밀번호를 해시화해줌)
  return res.redirect("/users/logout");
};
