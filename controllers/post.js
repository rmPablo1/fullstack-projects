const Post = require("../models/post")
const {validationResult} = require("express-validator")
const fs = require("fs")
const path = require("path")

exports.getPosts = async (req, res, next) => {

  try {
    const posts = await Post.find().populate("userId").sort({createdAt: -1})
    console.log("posts", posts)
    res.status(200).json({message: "Posts found", posts: posts})
  } catch(err){
    console.log(error)
    const error = new Error("Error creating post")
    error.statusCode = 422
    throw(error)
  }
}

exports.getPost = async (req, res, next) => {
  const postId = req.params
  console.log(postId)

  try{
    const post = await Post.findById(postId.postId)
    if (!post){
      const error = new Error("Post not found")
      error.statusCode = 404
      throw error
    }

    console.log(post)

    res.status(200).json({message: "Post found!", post: post})
  } catch (err){
    if (!err.statusCode){
      err.statusCode = 500
    }
    next(err)
  }

}

exports.createPost = async (req, res, next) => {
  const {title, content } = req.body
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    const error = new Error(errors.array()[0].msg)
    error.statusCode = 500
    throw error
  }
  const image = req.file.path.replace("\\" ,"/")
  const post = new Post({userId: req.userId, title: title, content: content, imageUrl: image})
  try{
    const postSaved = await post.save()
    if (postSaved){
      res.status(201).json({message: "Post added successfully", post: postSaved})
    }
  } catch (err) {
    const error = new Error("Error creating post")
    error.statusCode = 422
    throw(error)
  }
}

exports.updatePost = async (req, res, next) => {
  const {postId} = req.params
  const {title, content} = req.body
  let image;

  try{
    const post = await Post.findById(postId)
    if(!post){
      const error = new Error("Post not found")
      error.statusCode = 404
      throw error
    }
    if(!req.file){
      image = post.imageUrl
    } else if (req.file){
      console.log("Image given!")
      image = req.file.path.replace("\\","/")
    }

    post.title = title
    post.content = content
    post.imageUrl = image

    const updatedPost = await post.save()
    if (updatedPost){
      res.status(201).json({message: "Post updated successfully", post: updatedPost})
    }

  } catch (err){
    if (!err.statusCode){
      err.statusCode = 404
    }
    next(err)
  }

}

exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId
  try{
    const postBefore = await Post.findById(postId)
    clearImage(postBefore.imageUrl)
    const post = await Post.findByIdAndRemove(postId)
    if(!post){
      const error = new Error("Post not found")
      error.statusCode = 422
      throw(error)
    }
    res.status(200).json({message: "Post deleted successfully", post: post})
  } catch (err){
    if(!err.statusCode){
      err.statusCode = 500
    }
    next(err)
  }
}

const clearImage = filePath => {
  filePath = path.join(__dirname, "..", filePath)
  fs.unlink(filePath, err => console.log(err))
}
