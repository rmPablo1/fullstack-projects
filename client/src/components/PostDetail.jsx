import { useParams } from "react-router-dom"
import { useContext } from "react"
import { PostContext } from "../context/postContext"
function PostDetail() {
  const {posts} = useContext(PostContext)
  const postParam = useParams()
  const postsBefore = [...posts]
  const postUpdated = postsBefore.find(post => post._id === postParam.postId)
  const imageUrl = `https://blogapp-qvne.onrender.com/${postUpdated.imageUrl}`
  return (
    <div className="container">
      <div className="blog-complete-description">
        <h1>{postUpdated.title}</h1>
        <p>{new Date(postUpdated.createdAt).toLocaleString("en-GB")}</p>
        <p>by {postUpdated.userId.username}</p>
        <img className="blog-image-thumbnail" src={imageUrl} alt="image of postUpdated"/>
        <p>{postUpdated.content}</p>
      </div>
    </div>
  )
}

export default PostDetail
