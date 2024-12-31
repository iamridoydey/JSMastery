const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;
const users = [];

// Generate token
const option = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

const JWT_SECRET = "jesonwebtokenridoydey";
app.get("/", (req, res) => {
  return res.send(`
    <h1>Authentication app</h1>
    <a href="/signup">signup</a>
    <a href="/signin">signin</a>

    <div>
      <h1>All Users</h1>
      <ul>
      ${
        users.length === 0
          ? "No users found"
          : users.map((user) => `<li>${user.email}</li>`).join("")
      }
      </ul>
    </div>
    `);
});

// Middleware
app.use(express.json());

app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.send("Not a valid email or password!");

  const user = users.find(
    (user) => user.email == email && user.password == password
  );

  if (user) {
    return res.json({ Error: "User Already Exist!" });
  }

  users.push({ email, password });
  return res.json({ message: "Signed Up successfully" });
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.send("Not a valid email or password!");

  let userIndex = -1;
  const user = users.find((user, index) => {
    if (user.email == email && user.password == password) {
      userIndex = index;
      return true;
    }
    return false;
  });

  if (!user) return res.send("Not a valid email or password!");

  // Generate jwt for user
  const newToken = jwt.sign({ email: email }, JWT_SECRET);

  return res.json({ token: newToken });
});

// Middleware for post
function auth(req, res, next) {
  const sessionToken = req.headers["token"];
  console.log(sessionToken);
  const token = jwt.verify(sessionToken, JWT_SECRET);
  const email = token.email;

  const user = users.find((user) => user.email == email);
  console.log(user);
  if (!user) return res.json({ message: "Signin please" });
  req.email = email;
  next();
}

app.use(auth);

app.get("/post", (req, res) => {
  res.send(`<h3>Hurrah! Authentication Done.</h3>`);
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
