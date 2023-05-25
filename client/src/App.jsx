import './App.css'
import { useContext, useEffect } from 'react'
import {Route, Routes, Link, redirect} from "react-router-dom"
import { PostContext } from './context/postContext'
import PostList from './components/PostList'
import PostAdd from './components/PostAdd'
import Login from './components/Login'
import Signup from './components/Signup'
import Navbar from './components/Navbar'
import {UserContext} from "./context/userContext"
import PostDetail from "./components/PostDetail"

function App() {
  const {posts, setPosts} = useContext(PostContext)
  const {token} = useContext(UserContext)
  console.log("token", token)
  useEffect(() => {
      fetch("http://localhost:8080/")
        .then(res => res.json())
        .then(data => {
          console.log(data)
          const postsData = data.posts
          setPosts(postsData)
        })
        console.log(posts)
  },[])

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<PostList />}/>
      <Route path="/add-post" element={<PostAdd/>}/>
      <Route path="/post/:postId" element={<PostDetail/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </>
  )
}

export default App
