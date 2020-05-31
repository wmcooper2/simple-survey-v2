const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const app = express();
const bodyParser = require("body-parser");

require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
// const url = "mongodb://localhost:27017";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Use connect method to connect to the server
MongoClient.connect(process.env.DB_URL, { useUnifiedTopology: true }, function (
  err,
  client
) {
  assert.equal(null, err);
  const db = client.db(process.env.DB_NAME);
  console.log("Connected to database: ", process.env.DB_NAME);

  //make a collection
  const simpleSurvey = db.collection(process.env.DB_COLLECTION);
  ///to pass the db around
  app.use((req, res, next) => {
    res.locals.simpleSurvey = simpleSurvey;
    next();
  });

  app.use("/", indexRouter);
  app.use("/users", usersRouter);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });

  // client.close();
});

module.exports = app;
