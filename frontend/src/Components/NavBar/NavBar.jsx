import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MdShoppingCart } from "react-icons/md"
import { FiSearch, FiLogOut  } from "react-icons/fi"
import { FaShoppingBag, FaUser } from "react-icons/fa";
import { MdLockReset } from "react-icons/md"


import './NavBar.css'
import logo from '../../Assets/SiteImages/logo.png'
import {StoreContext} from '../../Context/StoreContext'

function NavBar({ setShowPopUp, setHasAccount, location }){

const [nav, setNav] = useState('Home');

const {netItems, token, setToken, setCart } = useContext(StoreContext);

const navigate = useNavigate()

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    setToken("");
    setCart({});
    navigate("/");
}


location = useLocation();
useEffect(
    () => {
        if(location.hash){
            let element = document.querySelector(location.hash);
            element && element.scrollIntoView();    }

        if(location.pathname === '/cart'){
            setNav('Cart')  } 

        else if(location.pathname === '/search'){
            setNav('Search')  } 

        else if(location.pathname === '/' && location.hash === '#explore-menu'){
            setNav('Menu')  } 

        else if(location.pathname === '/' && location.hash === '#gift'){
            setNav('Gifting')   } 

        else if(location.pathname === '/' && location.hash === '#contact-us'){
            setNav('Contact-Us')   }
        
        else if(location.pathname === '/'){
            setNav('Home')  } 

        else{
            setNav('')
        }   
    },
    [location]
)
    
return (
<div className='navbar' id='nav'>

<img src={logo} alt="logo" className='logo' />

<ul className="navbar-menu">
    <li 
    onClick={() => setNav('Home')}
    className={nav === 'Home'?'active':''}>
    <Link to="/"> Home </Link> </li>

    <li 
    onClick={() => setNav('Menu')}
    className={nav === 'Menu'?'active':''}>
    <Link to='/#explore-menu'> Menu </Link> </li>

    <li 
    onClick={() => setNav('Gifting')}
    className={nav === 'Gifting'?'active':''}>
    <Link to='/#gift'> Gifting </Link> </li>

    <li 
    onClick={() => setNav('Contact-Us')}
    className={nav === 'Contact-Us'?'active':''}>
    <Link to='/#contact-us'> Contact-Us </Link> </li>

</ul>
<div className="navbar-right">
    <div className='navbar-search-icon'>
        <Link to='/search' onClick={() => setNav('Search')}> 
            <FiSearch size={26} className={nav === 'Search'?'active-icon':''}/>
        </Link>
    </div> 

    <div className="navbar-cart-icon"> 
        {netItems? <div className="dot"></div> : <></>}
        <Link to='/cart' onClick={() => setNav('Cart')}> 
            <MdShoppingCart size={30} className={nav === 'Cart'?'active-icon':''}/> 
        </Link>
    </div>

    {!token
    ? <div className='sign-in-btn'>
        <button onClick={() => {setShowPopUp(true); setHasAccount(true)}}>Sign In</button>
        </div>
    : <div className='navbar-profile'>
        <div className='navbar-profile-icon'>
            <FaUser size={25} /> 
            <span style={{"fontSize":"27px", "marginLeft":"10px"}}>{localStorage.getItem("name")}</span>
        </div>
        <ul className='navbar-profile-dropdown'>
            <Link to='/my-orders' className='list-item'> <FaShoppingBag size={23} /> Your Orders</Link>
            <Link to='/reset-password' className='list-item'> <MdLockReset size={30} />Reset Password</Link>
            <li onClick={logout} className='list-item'> <FiLogOut size={23} /> Logout</li>
        </ul>

    </div>
    }
    
</div>

</div>
)}

export default NavBar
