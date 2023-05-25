import {useState, useEffect, createContext} from "react"
import { UserProvider } from "./userContext"
export const PostContext = createContext()


export function Provider({children}){
  const [posts, setPosts] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [postToEdit, setPostToEdit] = useState(undefined)

  const toShare = {
    posts,
    isEditing,
    setIsEditing,
    setPosts,
    postToEdit,
    setPostToEdit
  }

  return <PostContext.Provider value={toShare}>
    <UserProvider>
      {children}
    </UserProvider>
  </PostContext.Provider>
}
