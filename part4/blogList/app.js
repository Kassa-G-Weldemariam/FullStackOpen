const express = require("express");
const mongoose = require("mongoose");
const blogRoute = require("./controllers/blogs");
const userRoute = require("./controllers/users");
const loginRoute = require("./controllers/login");
const middleware = require("./utils/middleware");
const config = require("./utils/config");
const logger = require("./utils/logger");

const app = express();

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    logger.info("connected to db");
  })
  .catch((error) => logger.error(error.message));

app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor)

app.use("/api/login", loginRoute);
app.use("/api/blogs", blogRoute);
app.use("/api/users", userRoute);

app.use(middleware.unknownEndPoints);
app.use(middleware.errorHandler);

module.exports = app;
