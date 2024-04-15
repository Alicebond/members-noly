const User = require("../models/user");
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const passport = require("passport");

/////////////////////////////////////////
/// Passport Strategy ///
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    asyncHandler(async (username, password, done) => {
      const user = await User.findOne({ username: username });

      if (user === null) {
        return done(null, false, { message: "Incorrect user name" });
      }

      if (!(await user.comparePassword(password, user.password))) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    })
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(
  asyncHandler(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  })
);

///////////////////////////////////

exports.user_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User list");
});

exports.user_detail = asyncHandler(async (req, res, next) => {
  // Get user details and all their posts (in parallel)
  const [user, allPostsByUser] = await Promise.all([
    User.findById(req.params.id).exec(),
    Post.find({ author: req.params.id }).exec(),
  ]);

  if (user === null) {
    // No rsults
    const err = new Error("User not found");
    err.status = 404;
    return next(err);
  }

  res.render("user_detail", {
    title: "User Infomation",
    user: user,
    user_posts: allPostsByUser,
  });
});

exports.user_login_get = asyncHandler(async (req, res, next) => {
  res.render("user_login_form", {
    title: "Log In",
    errors: req.session.messages ? req.session.messages : false,
  });
});

exports.user_login_post = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("User name must be specified"),
  body("password").isLength({ min: 4 }),

  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/home/user/log-in",
    failureMessage: true,
  }),
];

exports.user_creat_get = asyncHandler(async (req, res, next) => {
  res.render("user_signup_form", { title: "Sign Up", errors: false });
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
      username: req.body.username,
      password: req.body.password,
    });

    if (!errors.isEmpty()) {
      // There are errors, render form again with sanitized values/ error message
      res.render("user_signup_form", {
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
