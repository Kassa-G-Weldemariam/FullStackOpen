const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");


 const listWithManyBlog = [
   {
     _id: "5a422aa71b54a676234d17f8",
     title: "Go To Statement Considered Harmful",
     author: "Edsger W. Dijkstra",
     url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
     likes: 8,
     __v: 0,
   },
   {
     _id: "5a422aa71b54a676234d17f8",
     title: "Go To Statement Considered Harmful",
     author: "name changed",
     url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
     likes: 4,
     __v: 0,
   },
   {
     _id: "5a422aa71b54a676234d17f8",
     title: "Go To Statement Considered Harmful",
     author: "Edsger W. Dijkstra",
     url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
     likes: 5,
     __v: 0,
   },
   {
     _id: "5a422aa71b54a676234d17f8",
     title: "Go To Statement Considered Harmful",
     author: "Edsger W. Dijkstra",
     url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
     likes: 15,
     __v: 0,
   },
 ];

 test("author with most likes", () => {
   const result = listHelper.mostLikes(listWithManyBlog);
   const expected = { author: "Edsger W. Dijkstra", Likes: 28 };
   assert.deepStrictEqual(result, expected);
 });