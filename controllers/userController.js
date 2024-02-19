const User = require("../models/user");
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
  res.render("sign-up-form");
});

exports.user_creat_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User create POST");
});

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
