const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, require: true },
  password: { type: String, required: true },
});

UserSchema.virtual("url").get(function () {
  return `/home/user/${this._id}`;
});

UserSchema.pre("save", function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = async function (candidatePassword, done) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  if (!isMatch) return done(null, false, { message: "Incorrect password" });
};

module.exports = mongoose.model("User", UserSchema);
