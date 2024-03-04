const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const userController = require("../controllers/userController");

/// Posts Routes ///

//Get home page directly show all posts
router.get("/", postController.post_list);

// Get rquest for creating a post. NOTE This must come before routes that display Book (uses id). Why
router.get("/post/create", postController.post_create_get);

// Post request for creating a post.
router.post("/post/create", postController.post_create_post);

// Get request for deleting a post
router.get("/post/:id/delete", postController.post_delete_get);

// Post request for deleting a post
router.post("/post/:id/delete", postController.post_delete_post);

// Get request for updating a post
router.get("/post/:id/update", postController.post_update_get);

// Post request for updating a post
router.post("/post/:id/update", postController.post_update_post);

// Get post detail
router.get("/post/:id", postController.post_detail);

// Get all posts
router.get("/posts", postController.post_list);

/// User Routes ///

// Get request for user log in
router.get("/user/log-in", userController.user_login_get);

// Post request for user log in
router.post("/user/log-in", userController.user_login_post);

// Get request for creating a user
router.get("/user/sign-up", userController.user_creat_get);

// Post request for creating a user
router.post("/user/sign-up", userController.user_creat_post);

// Get request for deleting a user
router.get("/user/:id/delete", userController.user_delete_get);

// Post request for deleting a user
router.post("/user/:id/delete", userController.user_delete_post);

// Get request for updating a user
router.get("/user/:id/update", userController.user_update_get);

// Get request for updating a user
router.post("/user/:id/update", userController.user_update_post);

// Get user detail
router.get("/user/:id", userController.user_detail);

// Get users list
router.get("/users", userController.user_list);

module.exports = router;
