const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../model/blog");
const User = require("../model/user");

const api = supertest(app);

describe("api blog tests", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test("blogs are returned as a json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("all blogs are returned", async () => {
    const result = await api.get("/api/blogs");
    assert.strictEqual(result.body.length, helper.initialBlogs.length);
  });
  test('blog posts should have a unique identifier named "id"', async () => {
    const response = await api.get("/api/blogs");

    response.body.forEach((blog) => {
      assert.ok(blog.id, "blog should have an id property");
      assert.strictEqual(
        blog._id,
        undefined,
        "blog should not have an _id property",
      );
    });
  });
});
describe("authorized tests", () => {
  let token = null;

  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const newUser = {
      username: "testUser",
      name: "tester",
      password: "password",
    };
    await api.post("/api/users").send(newUser);
    const loginResponse = await api
      .post("/api/login")
      .send({ username: "testUser", password: "password" });
    token = loginResponse.body.token;
  });

  test("successfully creates a blog when authorized", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const newBlog = {
      title: "testing with auth",
      author: "Girmay",
      url: "example.com",
      likes: 12,
    };
    const result = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1);
    assert.strictEqual(result.body.title, "testing with auth");
  });
  test("creating a blog fails without authorization", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const newBlog = {
      title: "testing with auth",
      author: "Girmay",
      url: "example.com",
      likes: 12,
    };
    const result = await api.post("/api/blogs").send(newBlog).expect(401);
    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
  });
  test("default to 0 if likes property is missing", async () => {
    const newBlog = { title: "testing", author: "Girmay", url: "example.com" };
    const result = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    assert.strictEqual(result.body.likes, 0);
  });

  test("fails with status code 400 if url or title is missed", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const newBlog = { author: "Girmay", url: "example.com", likes: 8 };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
  });
  test("any one can increment likes without a token", async () => {
    const newBlog = {
      title: "To be deleted",
      author: "kassa",
      url: "test.com",
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`);

    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const updateData = { likes: blogToUpdate.likes + 1 };

    const result = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updateData)
      .expect(200);

    assert.strictEqual(result.body.likes, blogToUpdate.likes + 1);
    assert.strictEqual(result.body.id, blogToUpdate.id);
    assert.notDeepStrictEqual(result.body, blogToUpdate);
  });
  test("deleting a blog fails without a token", async () => {
    const newBlog = {
      title: "To be deleted",
      author: "kassa",
      url: "test.com",
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`);

    const blogsAtStart = await helper.blogsInDb();
    const blogToBeDeleted = blogsAtStart[0];
    await api.delete(`/api/blogs/${blogToBeDeleted.id}`).expect(401);
    const blogsAtEnd = await helper.blogsInDb();
    const ids = blogsAtEnd.map((n) => n.id);
    assert.strictEqual(ids.includes(blogToBeDeleted.id), true);
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
  });
  test("successfully deletes a blog by it's creator", async () => {
    const newBlog = {
      title: "To be deleted",
      author: "kassa",
      url: "test.com",
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`);

    const blogsAtStart = await helper.blogsInDb();
    const blogToBeDeleted = blogsAtStart[0];
    await api
      .delete(`/api/blogs/${blogToBeDeleted.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);
    const blogsAtEnd = await helper.blogsInDb();
    const ids = blogsAtEnd.map((n) => n.id);
    assert.strictEqual(ids.includes(blogToBeDeleted.id), false);
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
  });
});

after(async () => {
  await mongoose.connection.close();
});
