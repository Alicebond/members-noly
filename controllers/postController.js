const Post = require("../models/post");
const asyncHandler = require("express-async-handler");

exports.post_list = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find().populate("author").exec();

  res.render("index", {
    title: "Posts Club",
    posts: allPosts,
    user: req.user ? req.user : false,
    isLoggedIn: req.isAuthenticated() ? req.isAuthenticated() : false,
  });
});

exports.post_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Post detail: ${req.params.id}`);
});

exports.post_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Post create GET");
});

exports.post_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Post create POST");
});

exports.post_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Post delete GET");
});

exports.post_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Post delete POST");
});

exports.post_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Post update GET");
});

exports.post_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Post update POST");
});
