import { Navigate } from "react-router-dom"
import { useContext } from "react"
import {UserContext} from "../context/userContext"
function Login() {
  const {isAuth,setToken, token, setUserId, setIsAuth, setUsername} = useContext(UserContext)
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    fetch("https://blogapp-qvne.onrender.com/login", {
      method: "POST",
      body: formData
    }).then(res => res.json())
    .then(data => {
      if (data.status === 200){
        setIsAuth(true)
        setToken(data.token)
        setUsername(data.user.username)
        setUserId(data.user._id)
      }
    })
  }

  return (
    <div className="container">
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="text" name="email"/>
        <label>Password</label>
        <input type="password" name="password" />
        <button type="submit">LOGIN</button>
        {isAuth && <Navigate to="/"/>}
      </form>
    </div>
  )
}

export default Login
