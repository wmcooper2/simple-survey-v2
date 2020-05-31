const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index", { documents: 3 });
});

router.post("/submitform", (req, res, next) => {
  //put data into database
  // res.json({ "your data": req.body });
  res.redirect("/thankyou");
});

router.get("/test/:banana", (req, res, next) => {
  res.json({ "you posted": req.params });
});

router.get("/thankyou", (req, res, next) => {
  res.render("thankyou");
});

module.exports = router;
