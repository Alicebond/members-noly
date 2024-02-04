const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, require: true },
  password: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["member", "regular"],
    default: "regular",
  },
});

UserSchema.virtual("fullname").get(function () {
  return `${this.firstname} ${this.lastname}`;
});

UserSchema.virtual("url").get(function () {
  return `/home/user/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);
