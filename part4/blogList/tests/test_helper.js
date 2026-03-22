const Blog = require("../model/blog");
const User = require("../model/user");

const initialBlogs = [
  {
    title: "about something",
    author: "kassa",
    url: "full-stack-open.com",
    likes: 10,
  },
  {
    title: "another title",
    author: "Girmay",
    url: "example.com",
    likes: 8,
  },
];

// const nonExistingId = async () => {
//   const blog = new Blob({ content: "will remove this soon" });
//   await blog.save();
//   await blog.deleteOne();
//   return blog._id.toString();
// };

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = { initialBlogs, blogsInDb, usersInDb };
