import {useState} from "react"
import {Navigate} from "react-router-dom"
function Signup() {
  const [error, setError] = useState(false)
  const [isSignedUp, setIsSignedUp] = useState(false)
  const [usernameError, setUsernameError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    if (formData.get("username").length > 0 && formData.get("username").length < 7){
      setUsernameError("Username must have more than 7 characters")
      setError(true)
    } else if (formData.get("username").length >= 16){
      setUsernameError("Username must have less than 15 characters")
      setError(true)
    }

    if (formData.get("password").length > 0 && formData.get("password").length < 7){
      setPasswordError("Password must have more than 7 characters")
      setError(true)
    } else if (formData.get("password").length >= 15){
      setPasswordError("Password must have less than 15 characters")
      setError(true)
    }

    if(!error){
      fetch("https://blogapp-qvne.onrender.com//signup",{
        method: "POST",
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200 || data.status === 201){
          setIsSignedUp(true)
        }
      }).catch(err =>{
        setError(true)
      })
    }

    setError(false)
  }
  return (
    <div className="container">
      <form className="signupForm" onSubmit={handleSubmit}>
        <label htmlFor="">Username</label>
        <input type="text" name="username"/>
        {usernameError.length > 0 && <p style={{color: "red", fontSize: "15px"}}>{usernameError}</p>}
        <label htmlFor="">Email</label>
        <input type="email" name="email"/>
        <label htmlFor="">Password</label>
        <input type="password" name="password"/>
        {passwordError.length > 0 && <p style={{color: "red", fontSize: "15px"}}>{passwordError}</p>}
        <button>Signup</button>
        {isSignedUp && <Navigate to="/login"/>}
      </form>
    </div>
  )
}

export default Signup
