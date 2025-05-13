import {useContext} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { LuClipboardPen } from "react-icons/lu";
import { BiAddToQueue } from "react-icons/bi"
import { BiDetail } from "react-icons/bi"
import { MdOutlineShoppingCart } from "react-icons/md"
import { MdLockReset } from "react-icons/md"
import { MdLogout } from "react-icons/md";

import './SideBar.css'
import logo from '../../Assets/logoAdmin.png'
import { AdminContext } from '../../Context/AdminContext';

function SideBar() {

const { setToken  } = useContext(AdminContext);

const navigate = useNavigate()

const handleLogOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
}

return (
<div className='side-bar'>

<div style={{"position":"sticky", "top":"20px" ,"width":"100%"}}>

<img src={logo} alt='logo' className='logo'/>

<ul className='side-bar-links'>
  <NavLink to='category-management' className="side-bar-item" >
    <LuClipboardPen className='side-bar-icons'/>
    <p>Categories</p>
  </NavLink>

  <NavLink to='add-item' className="side-bar-item" >
    <BiAddToQueue className='side-bar-icons'/>
    <p>Add Item</p>
  </NavLink>

  <NavLink to='item-management' className="side-bar-item">
    <BiDetail className='side-bar-icons'/>
    <p>Item Management</p>
  </NavLink>

  <NavLink to='orders' className="side-bar-item">
    <MdOutlineShoppingCart className='side-bar-icons'/>
    <p>Orders</p>
  </NavLink>

  <NavLink to='password-reset' className="side-bar-item">
    <MdLockReset size={28} className='side-bar-icons'/>
    <p>Reset Password</p>
  </NavLink>

  <button className="side-bar-item" onClick={handleLogOut}>
    <MdLogout className='side-bar-icons'/>
    <p>Logout</p>
  </button>
</ul>
</div>

</div>
)}

export default SideBar
