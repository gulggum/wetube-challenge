export const join = (req, res) => {
  return res.send("Join");
};
export const login = (req, res) => {
  return res.send("login");
};

export const logout = (req, res) => {
  return res.send("Logout");
};
export const edit = (req, res) => {
  return res.send("Edit User");
};

export const remove = (req, res) => {
  return res.send("Remove User");
};

export const see = (req, res) => {
  return res.send(`Your ID : ${req.params.id}`);
};
