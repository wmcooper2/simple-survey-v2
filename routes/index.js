const express = require("express");
const router = express.Router();

router.get("/browse", (req, res, next) => {
  const simpleSurvey = res.locals.simpleSurvey;
  simpleSurvey
    .aggregate([{ $sample: { size: 10 } }])
    .toArray()
    .then((randomData) => {
      res.render("browse", { data: randomData });
    })
    .catch((error) => {
      console.error(error);
    });
});

router.post("/submitform", (req, res, next) => {
  //put data into database
  const simpleSurvey = res.locals.simpleSurvey;
  simpleSurvey
    .insertOne({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      idnumber: req.body.idnumber,
      age: req.body.age,
      education: req.body.education,
      comments: req.body.comments,
    })
    .then((result) => {
      // console.log("Insert One Result: ", result);
    })
    .catch((error) => {
      console.error(error);
    });

  //redirect regardless
  res.redirect("/thankyou");
});

router.get("/test/:banana", (req, res, next) => {
  res.json({ "you posted": req.params });
});

router.get("/thankyou", (req, res, next) => {
  res.render("thankyou");
});

router.get("/", (req, res, next) => {
  const simpleSurvey = res.locals.simpleSurvey;
  let result = "a bazillion";

  simpleSurvey
    .aggregate([{ $sample: { size: 10 } }])
    .toArray()
    .then((randomData) => {
      simpleSurvey
        .countDocuments()
        .then((result) => {
          res.render("index", { documents: result, data: randomData });
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;
