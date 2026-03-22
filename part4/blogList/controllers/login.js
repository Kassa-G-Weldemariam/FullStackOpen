const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRoute = require("express").Router();
const User = require("../model/user");

loginRoute.post("/", async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  const user = await User.findOne({ username }).select("+password");
  const correctPassword =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!user || !correctPassword) {
    return res.status(401).json({ error: "invalid username or password" });
  }
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 });
  res.status(200).json({ token, username: user.username, name: user.name });
});

module.exports = loginRoute;
