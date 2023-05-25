const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {validationResult} = require("express-validator")
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        process.env.SENDGRID_KEY
    }
  })
);

exports.postLogin = async (req, res, next) => {
  const {email, password} = req.body
  console.log(email, password)
  try{
    const user = await User.findOne({email: email})
    if (!user){
      console.log("user not found")
      const error = new Error("Invalid Credentials")
      error.statusCode = 401
      throw error
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch){
      const error = new Error("Invalid Credentials")
      error.statusCode = 401
      throw error
    }

    const token = jwt.sign({
      email: email,
      userId: user._id
    }, "ajfajfajfpafkoakapokkoakok", {expiresIn: "1h"})
    console.log(token)

    res.status(200).cookie("token", token).json({message:"User signed in correctly", status: 200, user:user, token: token })
  } catch (err){
    if (!err.statusCode){
      err.statusCode = 401
    }
    next(err)
  }
}

exports.postSignup = async (req, res, next) => {
  const {email, password, username} = req.body
  const errors = validationResult(req)

  try{
    if(!errors.isEmpty()){
      const error = new Error(errors.array()[0].msg)
      error.statusCode = 500
      throw error
    }
    const user = await User.findOne({email: email})

    if (user){
      console.log("user found")
      const error = new Error("User exists")
      error.statusCode = 401
      throw error
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = new User({email: email, password: hashedPassword, username: username})
    const savedUser = await newUser.save()
    res.status(201).json({message: "User created successfully", user: savedUser})
    transporter.sendMail({
      to: email,
      from: 'blogappproject@gmail.com',
      subject: 'Password reset',
      html: `
        <p>Thanks for signing up in my website!</p>
        <p>If you want to share some thoughts please don't doubt contacting me through my <a href="https://www.linkedin.com/in/pablo-rubio-monzo/">LinkedIn</a> or my personal email: pablorubiiimonzo@gmail.com</p>
      `
    });

  } catch (err){
    if(!err.statusCode){
      err.statusCode = 401
    }
    next(err)
  }
}
