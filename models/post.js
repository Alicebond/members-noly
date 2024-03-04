const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

PostSchema.virtual("url").get(function () {
  return `/home/post/${this._id}`;
});

PostSchema.virtual("createdAtFormatted").get(function () {
  return this.createdAt
    ? DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED)
    : "";
});

PostSchema.virtual("updatedAtFormatted").get(function () {
  return this.updatedAt
    ? DateTime.fromJSDate(this.updatedAt).toLocaleString(DateTime.DATE_MED)
    : "";
});

module.exports = mongoose.model("Post", PostSchema);
