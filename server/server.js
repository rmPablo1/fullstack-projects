const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const multer = require("multer")
const mongoose = require("mongoose")
const postRoutes = require("./routes/post")
const authRoutes = require("./routes/auth.js")
const path = require("path")
const { v4: uuidv4 } = require('uuid');


const MongoDBUri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@blogapp.pf6dslx.mongodb.net/?retryWrites=true&w=majority`

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images")
  },
  filename: (req, file, cb) => {
    cb( null, uuidv4() + "." + file.mimetype.split("/")[1])
  }
})

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  next()
})

const fileFilter = (req, file, cb) => {
  if  (file.mimetype === "image/jpg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg"
      ){
        cb(null, true)
      } else {
        cb(null, false)
      }
}

app.use(bodyParser.json())
app.use(multer({storage: storage, fileFilter: fileFilter}).single("image"))
app.use("/images", express.static(path.join(__dirname, "images")))

app.use(postRoutes)
app.use(authRoutes)
app.use((err, req, res, next) => {
  const status = err.statusCode || 500
  res.status(status).json({message: "There was an error in the server", status: status})
})

mongoose.connect(MongoDBUri).then(result => {
  app.listen(process.env.PORT || 8080)
}).catch(err => console.log(err))
