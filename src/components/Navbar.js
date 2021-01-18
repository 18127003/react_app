import React, {useState} from "react"
import { NavLink } from "react-router-dom"
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi"

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const links = [
      {
        id: 1,
        path: "/",
        text: "Home",
      },
      {
        id: 2,
        path: "/about",
        text: "About",
      },
  ]
  const style={
    showMenu:{
      
    },
    hideMenu:{
     display:"none",
    },
    btnStyle:{
      position:"fixed",
      right: "1%",
      top:"1%",
    },
  }
  
  const handleToggle = () => {
    setNavbarOpen(prev => !prev)
  }
  return (
    <React.Fragment>
      <nav className="navBar row" style={navbarOpen?style.showMenu:style.hideMenu}>
        <ul>
          {links.map(link => {
            return (
              <li key={link.id}>
                <NavLink to={link.path} activeClassName="active-link" exact>{link.text}</NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
      <button className={`btn-floating hoverable ${navbarOpen?"":"pulse"}`} 
      onClick={handleToggle} 
      style={style.btnStyle}>
        {navbarOpen ? <MdClose/>: <FiMenu/>}
      </button>
    </React.Fragment>  
  )
}
export default Navbar