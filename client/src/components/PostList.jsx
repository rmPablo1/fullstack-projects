import { useContext } from "react"
import { PostContext } from "../context/postContext"
import PostShow from "./PostShow"

function PostList() {
  const {posts, } = useContext(PostContext)
  const renderedPosts = posts.map(post => {
    return <PostShow key={post._id} post={post}/>
  })
  return (
    <div className="posts-list">{renderedPosts}</div>
  )
}

export default PostList
