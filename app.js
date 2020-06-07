const createError = require("http-errors");
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const app = express();

// require("./handleUpdate");

// for Lightsail
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");

require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//for development on macbook only

// Use connect method to connect to the server
MongoClient.connect(
  process.env.DB_URL,
  { useUnifiedTopology: true },
  (err, client) => {
    assert.equal(null, err);
    const db = client.db(process.env.DB_NAME);
    console.log("Connected to database: ", process.env.DB_NAME);
    const simpleSurvey = db.collection(process.env.DB_COLLECTION);

    //for mackbook
    ///to pass the db around
    app.use((req, res, next) => {
      res.locals.simpleSurvey = simpleSurvey;
      next();
    });

    app.use("/", indexRouter);
    app.use("/users", usersRouter);

    // for Lightsail
    // app.get("/", (req, res) => {
    // res.sendFile(
    // path.join(__dirname, "web-portfolio", "build", "index.html")
    // );
    // });
    // app.use(
    // "/",
    // express.static(path.join(__dirname, "web-portfolio", "build"))
    // );
    //
    // app.get("/markdown-preview", (req, res) => {
    // res.sendFile(
    // path.join(__dirname, "markdown-preview", "build", "index.html")
    // );
    // });
    // app.use(
    // "/markdown-preview",
    // express.static(path.join(__dirname, "markdown-preview", "build"))
    // );
    //
    // app.get("/random-quote-machine", (req, res) => {
    // res.sendFile(
    // path.join(__dirname, "random-quote-machine", "build", "index.html")
    // );
    // });
    // app.use(
    // "/random-quote-machine",
    // express.static(path.join(__dirname, "random-quote-machine", "build"))
    // );
    //
    // app.get("/tribute-page", (req, res) => {
    // res.sendFile(path.join(__dirname, "tribute-page", "index.html"));
    // });
    // app.use(
    // "/tribute-page",
    // express.static(path.join(__dirname, "tribute-page"))
    // );
    //
    // app.get("/tribute-page-v2", (req, res) => {
    // res.sendFile(
    // path.join(__dirname, "tribute-page-v2", "build", "index.html")
    // );
    // });
    // app.use(
    // "/tribute-page-v2",
    // express.static(path.join(__dirname, "tribute-page-v2", "build"))
    // );
    //
    // app.get("/web-resume", (req, res) => {
    // res.sendFile(path.join(__dirname, "web-resume", "build", "index.html"));
    // });
    // app.use(
    // "/web-resume",
    // express.static(path.join(__dirname, "web-resume", "build"))
    // );

    //uncomment for Lightsail only, otherwise it creates and error on my macbook
    // const privateKey = fs.readFileSync(process.env.PRIVKEY, "utf8");
    // const certificate = fs.readFileSync(process.env.FULLCHAIN, "utf8");
    // https.createServer({ key: privateKey, cert: certificate }, app).listen(443);

    //  app.use("/", indexRouter);
    //  app.use("/users", usersRouter);

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
    console.log("Web portfolio server running.");
  }
);

module.exports = app;
