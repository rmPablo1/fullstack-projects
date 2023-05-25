import ReactDOM from "react-dom"
import {useContext} from "react"
import {UserContext} from "../context/userContext"
import { Link } from 'react-router-dom'
const LINKS = [
  {path: "/", label: "All Posts"},
  {path: "/add-post", label: "Add Post"},
]

const AUTHLINKS = [
  {path: "/login", label: "Login"},
  {path: "/signup", label: "Signup"}
]
function ModalNavbar({onClose}) {

  const {isAuth} = useContext(UserContext)

  const renderedLinks = LINKS.map((link) => {
    return <li onClick={onClose} key={link.label}><Link to={link.path}>{link.label}</Link></li>
  })

  const authRenderedLinks = AUTHLINKS.map(link => {
    return <li  onClick={onClose} key={link.label}><Link to={link.path}>{link.label}</Link></li>
  })
  return ReactDOM.createPortal(
    <div>
      <div className="modal">
        <h2 onClick={onClose}>X</h2>
        {renderedLinks}
        {!isAuth && authRenderedLinks}
      </div>
    </div>
  , document.getElementById("modalpage"))
}

export default ModalNavbar
