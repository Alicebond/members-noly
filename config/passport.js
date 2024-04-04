const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

passport.use(
  new LocalStrategy(
    asyncHandler(async (username, password, done) => {
      const user = await User.findOne({ username: username });

      if (user === null)
        return done(null, false, { message: "Incorrect user name" });

      return user.comparePassword(password, done);
    })
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(
  asyncHandler(async (id, done) => {
    const user = User.findById(id);
    done(null, user);
  })
);
