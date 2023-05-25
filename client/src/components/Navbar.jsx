import {Link} from "react-router-dom"
import {useContext, useState} from "react"
import {UserContext} from "../context/userContext"
import {AiOutlineMenu} from "react-icons/ai"
import ModalNavbar from "./ModalNavbar"

const LINKS = [
  {path: "/", label: "All Posts"},
  {path: "/add-post", label: "Add Post"},
]

const AUTHLINKS = [
  {path: "/login", label: "Login"},
  {path: "/signup", label: "Signup"}
]
function Navbar() {

  const [isOpen, setIsOpen] = useState(false)
  const {isAuth, username} = useContext(UserContext)

  const handleClose = () => {
    setIsOpen(false)
  }

  const renderedLinks = LINKS.map((link) => {
    return <li key={link.label}><Link to={link.path}>{link.label}</Link></li>
  })

  const authRenderedLinks = AUTHLINKS.map(link => {
    return <li key={link.label}><Link to={link.path}>{link.label}</Link></li>
  })
  return (
    <header>
      <nav>
        <ul>
          <li className="brand" style={{fontSize: "30px"}}><Link to="/">My Blog</Link></li>
          <div style={{display: "flex", alignItems:"center"}}>
            {renderedLinks}
            {!isAuth && authRenderedLinks}
            <li>{isAuth && username}</li>
            <li onClick={()=> setIsOpen(true)}><AiOutlineMenu/></li>
            {isOpen && <ModalNavbar onClose={handleClose}/>}
          </div>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
