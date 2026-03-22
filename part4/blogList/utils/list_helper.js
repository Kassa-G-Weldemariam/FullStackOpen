const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (posts) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return posts.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  return Math.max(...blogs.map((blog) => blog.likes));
};

const mostBlogs = (blogs) => {
  return _.chain(blogs)
    .countBy("author")
    .entries()
    .maxBy(_.last)
    .thru(([author, blogs]) => ({ author, blogs }))
    .value();
};
const mostLikes = (blogs) => {
  return _.chain(blogs)
    .groupBy("author")
    .map((blog, author) => ({ author, Likes: _.sumBy(blog, "likes") }))
    .maxBy("Likes")
    .value();
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs,mostLikes };
