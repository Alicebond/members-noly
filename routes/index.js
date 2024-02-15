const express = require("express");
const router = express.Router();

/* GET homw page */
router.get("/", function (req, res, next) {
  res.redirect("/home");
});

module.exports = router;
