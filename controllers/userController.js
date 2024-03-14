const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.user_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User list");
});

exports.user_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: User detail: ${req.params.id}`);
});

exports.user_login_get = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: User log in GET`);
});

exports.user_login_post = asyncHandler(async (req, res, next) => {
  // TODO: Redirect to "user/:id"
  res.send(`NOT IMPLEMENTED: User log in POST`);
});

exports.user_creat_get = asyncHandler(async (req, res, next) => {
  res.render("sign-up-form", { title: "Sign Up", errors: false });
});

exports.user_creat_post = [
  // Validate and sanitize fields
  body("username")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("User name must be specified"),
  body("firstname")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified."),
  body("lastname")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Last name must be specified."),
  body("password").isLength({ min: 4 }),
  body("passwordConfirmation").custom((value, { req }) => {
    const isMatch = value === req.body.password;
    if (!isMatch) {
      throw new Error("Password confirmation doesn't match Password");
    } else return true;
  }),

  // Process request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create author object with escaped and trimed data
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.lastname,
      password: req.body.password,
    });

    if (!errors.isEmpty()) {
      // There are errors, render form again with sanitized values/ error message
      res.render("sign-up-form", {
        title: "Sign Up",
        errors: errors.array(),
      });
      return;
    } else {
      // Data is valid
      // save new user
      await user.save();
      res.redirect(user.url);
    }
  }),
];

exports.user_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User delete GET");
});

exports.user_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User delete POST");
});

exports.user_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User update GET");
});

exports.user_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User update POST");
});
