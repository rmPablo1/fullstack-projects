import { useContext, useState } from "react"
import { UserContext } from "../context/userContext"
import { PostContext } from "../context/postContext"
import { BiEdit } from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai"
import {Link} from "react-router-dom"

function PostShow({post}) {
  const {posts, setPosts, setIsEditing, setPostToEdit} = useContext(PostContext)
  const {token, userId} = useContext(UserContext)

  setIsEditing(false)


  let isOwner = userId === post.userId._id
  const handleDelete = () => {
    fetch(`https://blogapp-qvne.onrender.com/post/${post._id}`,{
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(data => {
        const actualPosts = [...posts]
        const updatedPosts = actualPosts.filter(post => {
          return post._id !== data.post._id
        })
        setPosts(updatedPosts)
      })
  }

  const handleEdit = () => {
    setIsEditing(true)
    setPostToEdit(post)
  }

  const imageUrl = `https://blogapp-qvne.onrender.com/${post.imageUrl}`

  const link = `/post/${post._id}`
  return (
    <div className="container">
      <div className="blog-miniature">
        <img className="blog-image-thumbnail" src={imageUrl} alt="image of post"/>
        <div className="blog-miniature-description">
          <h1><Link to={link}>{post.title}</Link></h1>
          <p> <strong>{post.userId.username} <span style={{color: "#aaa"}}>{new Date(post.createdAt).toLocaleString("en-GB")}</span> </strong></p>
          <p>{post.content.substring(0,250)}..</p>
          <div style={{display: "flex", gap: "15px"}}>
            { isOwner && <a  style={{fontSize: "30px", cursor:"pointer"}} onClick={handleDelete}><AiFillDelete/></a>}
            {isOwner && <Link style={{fontSize: "30px"}}onClick={handleEdit} to="/add-post"><BiEdit/></Link>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostShow
