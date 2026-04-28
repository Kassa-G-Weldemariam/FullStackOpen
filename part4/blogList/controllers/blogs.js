const blogRoute = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../model/blog");
const User = require("../model/user");
const { userExtractor } = require("../utils/middleware");

blogRoute.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  console.log(blogs);
  res.json(blogs);
});

blogRoute.post("/", userExtractor, async (req, res) => {
  const { title, author, url, likes } = req.body;
  if (!req.user) {
    return res.status(401).json({ error: "invalid token" });
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.status(201).json(savedBlog);
});

blogRoute.delete("/:id", userExtractor, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "token missing" });
  }
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({ error: "blog not found" });
  }
  if (blog.user.toString() !== req.user.id.toString()) {
    return res
      .status(403)
      .json({ error: "only the creator can delete this blog" });
  }
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

blogRoute.put("/:id", async (req, res) => {
  const body = req.body;

  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).end();
  }
  blog.likes = body.likes;

  const updatedBlog = await blog.save();
  await updatedBlog.populate('user',{name:1})
  res.json(updatedBlog);
});

module.exports = blogRoute;
