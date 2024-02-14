const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Home page");
});

router.get("/sign-up", function (req, res) {
  console.log("sign-up");
  res.render("sign-up-form");
});

module.exports = router;
