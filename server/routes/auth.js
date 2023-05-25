const express = require("express")
const {body} = require("express-validator")
const router = express.Router()
const authController = require("../controllers/auth.js")

router.post("/login", authController.postLogin)

router.post("/signup", [
  body("username","Minimum length 7, maximum 15").isLength({min:7, max:15}),
  body("email", "Email format is invalid").trim().isEmail(),
  body("password", "Password is invalid").trim().isLength({min: 7, max: 15}).isAlphanumeric()
], authController.postSignup)

module.exports = router
