const express = require("express")
const router = express.Router()
const postsController = require("../controllers/post.js")
const isAuth = require("../middlewares/is-auth.js")
const {body} = require("express-validator")

router.get("/", postsController.getPosts)

router.post("/add-post",[
  body("title", "Minimum length 15 and maximum 60").isLength({min: 15, max: 60}).trim(),
  body("content", "Minimum length 300 and maximum 15000").isLength({min: 300, max: 15000}),
], isAuth, postsController.createPost)

router.get("/post/:postId", postsController.getPost)

router.patch("/edit-post/:postId", isAuth, postsController.updatePost)

router.delete("/post/:postId", isAuth,  postsController.deletePost)

module.exports = router
