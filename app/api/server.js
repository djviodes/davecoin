// *** Imports *** //
const createError = require("http-errors");
const bodyParser = require("body-parser");
const express = require("express");

const hellmocoinRouter = require("../hellmocoin/blockchain-router");

// *** Server Declaration *** //
const server = express();

// *** Middleware *** //
server.use(express.json());
server.use(bodyParser.json());

// *** Routers *** //
server.use("/api", hellmocoinRouter);

// *** Error Handling *** //
server.use((err, req, res, next) => {
  if (err instanceof createError.HttpError) {
    res.locals.message = err.message;
    res.locals.status = err.statusCode;
    if (process.env.NODE_ENV === "development") {
      res.locals.error = err;
    }
  }
  console.log(err);
  if (process.env.NODE_ENV === "production" && !res.locals.message) {
    res.locals.message = "ApplicationError";
    res.locals.status = 500;
  }
  if (res.locals.status) {
    res.status(res.locals.status || 500);
    const errObject = { error: res.locals.error, message: res.locals.message };
    return res.json(errObject);
  }
  next(err);
});

// *** Exports *** //
module.exports = server;
