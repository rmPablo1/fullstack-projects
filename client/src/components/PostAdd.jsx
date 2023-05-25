
import { useState } from "react"
import { useContext } from "react"
import { PostContext } from "../context/postContext"
import {UserContext} from "../context/userContext"
import 'react-quill/dist/quill.snow.css';
import {Navigate} from "react-router-dom"
function PostAdd() {
  const {isAuth, token, userId} = useContext(UserContext)
  const {posts, setPosts, isEditing, setIsEditing, setPostToEdit, postToEdit} = useContext(PostContext)
  const [valueInput, setValueInput] = useState(postToEdit?.title || '')
  const [valueContent, setValueContent] = useState(postToEdit?.content || '')
  const [addedPost, setAddedPost] = useState(false)

  let titleError = ""
  let contentError = ""


  if(valueInput.length > 0 && valueInput.length < 15){
    titleError = "We need MORE than 15 characters!"
  } else if (valueInput.length > 60){
    titleError = "We need LESS than 60 characters"
  }

  if(valueContent.length > 0 && valueContent.length < 300){
    contentError = "We need MORE than 300 characters!"
  } else if(valueContent.length > 15000){
    contentError = "We need LESS than 15000 characters"
  }


  const handleChangeTitle = (event) => {
      setValueInput(event.target.value)
  }

  const handleChangeContent = (event) => {
      setValueContent(event.target.value)
  }

  let method = "POST"
  let url = "https://blogapp-qvne.onrender.com/add-post"
  if (isEditing){
    method = "PATCH"
    url = "https://blogapp-qvne.onrender.com/edit-post/" + postToEdit._id
  }

  const handleSubmit = (event) => {
    event.preventDefault()
      const formData = new FormData(event.target)
      if (!isEditing){
        formData.append("userId", userId)
      }
      fetch(url, {
        method: method,
        headers: {
          Authorization: "Bearer " + token
        },
        body: formData
      }).then(res => res.json())
      .then(data => {
        if (!isEditing){
          setPosts([data.post,...posts])
        } else if(isEditing) {
          setIsEditing(false)
          setPostToEdit(undefined)
          const updatedPosts = posts.map((post) => {
            if (postToEdit._id === post._id) {
              return { ...post, title: data.post.title, content: data.post.content, imageUrl: data.post.imageUrl };
            }

            return post;
          });

          setPosts(updatedPosts);

        }
        setAddedPost(true)
      })
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {!isAuth && <Navigate to="/login"/>}
        <label>Title</label>
        <input style={{height: "30px",borderRadius: "8px", paddingLeft: "15px", fontSize: "25px"}}type="text" onChange={handleChangeTitle} name="title" value={valueInput} />
        {titleError.length > 0 && <p style={{color: "red", fontSize:"15px"}}>{titleError}</p>}
        <label>Content</label>
        <textarea name="content" style={{width:"100%", height:"300px", paddingLeft: "15px", fontSize: "25px"}}  value={valueContent} onChange={handleChangeContent} />
        {contentError.length > 0 && <p style={{color: "red", fontSize: "15px"}}>{contentError}</p>}
        <input type="file" name="image" />
        <button type="submit">{isEditing ? "Edit Post" : "Add Post"}</button>
        {addedPost && <Navigate to="/"/>}
      </form>
    </div>
  )
}

export default PostAdd
