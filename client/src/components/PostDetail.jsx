import { useParams } from "react-router-dom"
import { useContext } from "react"
import { PostContext } from "../context/postContext"
function PostDetail() {
  const {posts} = useContext(PostContext)
  console.log("all posts", posts)
  const postParam = useParams()
  console.log("param",postParam)
  const postsBefore = [...posts]
  const postUpdated = postsBefore.find(post => post._id === postParam.postId)
  console.log("postUpdated", postUpdated)
  const imageUrl = `http://localhost:8080/${postUpdated.imageUrl}`
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
