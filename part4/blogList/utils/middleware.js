const logger = require("./logger");
const jwt = require("jsonwebtoken");

const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:", req.path);
  logger.info("Body:", req.body);
  next();
};
const unknownEndPoints = (req, res) => {
  res.status(404).send({ error: "un known end point" });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformed input" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({
      error: error.message,
    });
  } else if (error.name === "MongoServerError") {
    return res.status(400).send({ error: error.message });
  }
  
  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.slice(7);
  } else {
    req.token = null;
  }
  next();
};

const userExtractor = (req, res, next) => {
  if (req.token) {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (decodedToken.id) {
      req.user = decodedToken;
    }
  }
  next();
};

module.exports = {
  unknownEndPoints,
  errorHandler,
  requestLogger,
  tokenExtractor,
  userExtractor,
};
