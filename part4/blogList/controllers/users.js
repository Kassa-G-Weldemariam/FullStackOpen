const userRoute = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");

userRoute.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    name,
    password: hashedPassword,
  });
  const result = await user.save();
  res.status(201).json(result);
});

userRoute.get("/", async (req, res) => {
  const user = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send("user not found");
  }
});

module.exports = userRoute;
