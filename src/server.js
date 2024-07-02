import express from "express";

const PORT = 4500;

const app = express();

app.get("/", (req, res) => {
  return res.send("<h1>This Page is Home🏠</h1>");
});
app.get("/login", (req, res) => {
  return res.send("<h1>Oh~ You Succese make Login Server🎉</h1>");
});

app.get("/logout", (req, res) => {
  return res.send("<h1> This Page is logout</h1>");
});

app.listen(PORT, () =>
  console.log(`Hi! It's me!! port http://localhost:${PORT} 😍`)
);
