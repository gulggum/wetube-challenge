import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/Memo";
import "./models/User";
import app from "./server";

const PORT = 4500;

app.listen(PORT, () =>
  console.log(`Hi! It's me!! http://localhost:${PORT} 😍`)
);
