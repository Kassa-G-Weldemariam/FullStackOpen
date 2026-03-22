const supertest = require("supertest");
const { test, describe, after } = require("node:test");
const assert = require("node:assert");
const helper = require("./test_helper");
const User = require("../model/user");
const app = require("../app");
const mongoose = require("mongoose");

const api = supertest(app);

describe("adding users", () => {
  test("adding a user will succeed", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "kgman",
      name: "kassa",
      password: "password12345",
    };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);
  });
  test("duplicate username won't be added", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "kgman",
      name: "kassa",
      password: "password12345",
    };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
    const usersAtEnd = await helper.usersInDb();
    const usernames = usersAtEnd.map((username) => username.username);
    assert(usernames.includes(newUser.username));
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
  test("to short username and name will not be added", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "kg",
      name: "ka",
      password: "password12345",
    };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});
after(async () => {
  await mongoose.connection.close();
});
