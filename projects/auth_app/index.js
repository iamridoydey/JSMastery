const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path")

const app = express();
const PORT = 3000;
const JWT_SECRET = "authpresentationfullstackapp";
const users = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, "ui")));
app.use(cors());
// Paths
app.get("/", (req, res) => {
  return res.sendFile("/index.html");
});

app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.json({ message: "Not a valid username or password" });

  users.push({
    username,
    password,
  });

  return res.json({ message: "Successfully Signed Up" });
});

app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.json({ message: "username and password should not be null!" });

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) return res.json({ message: "Not a valid username or password!" });

  // Create a token
  const token = jwt.sign({ username }, JWT_SECRET);

  return res.json({ message: "Successfully Signed In", token: token });
});

// Auth Middleware
function AUTH(req, res, next) {
  const token = req.headers["token"];
  console.log(token);
  if (!token) return res.redirect(path.join(__dirname, "ui", "signin.html"));

  const newToken = jwt.verify(token, JWT_SECRET);

  if (!newToken) return res.sendFile(path.join(__dirname, "ui", "signin.html"));

  const username = newToken.username;
  const user = users.find((user) => user.username === username);

  if (!user) res.json({ message: "Not a valid username or password!" });

  req.username = username;

  next();
}

app.use(AUTH);
app.get("/posts", (req, res) => {
  console.log(req.url)
  return res.send({ message: "Hurrah you have accessed!" });
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
