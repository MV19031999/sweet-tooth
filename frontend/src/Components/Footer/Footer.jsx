import React from 'react'
import { Link } from 'react-router-dom'
import { BiSolidPhoneCall } from "react-icons/bi"
import { BiLogoGmail } from "react-icons/bi"
import { FaFacebookF } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { LuInstagram } from "react-icons/lu"

import './Footer.css'
import logo from '../../Assets/SiteImages/logoFooter.png'

function Footer() {
return (
<div className='footer' id='contact-us'>

<div className="footer-content">

<div className="footer-content-left">
    <img src={logo} alt="logo" className='logo'/>
    <p> Our commitment is to delivering a sensory experience of freshness, quality, and unparalleled taste in every bite. Striving to be a crust above the rest, our dedication lies in providing superior quality goods, made with passion and perfection. </p>
</div>

<div className="footer-content-center">
    <h1>COMPANY</h1>
    <p><Link to='/#nav'>Home</Link></p>
    <p><Link to='/about'>About Us</Link></p>
    <p><Link to='/privacy-policy'>Privacy Policy</Link></p>
</div>

<div className="footer-content-right">
    <h1>GET IN TOUCH</h1>
    <div className='contact-info'>
        <BiSolidPhoneCall size={20}/>
        <p>1234567890</p>
    </div>
    <div className='contact-info'>
        <BiLogoGmail size={20}/>
        <p>sweet-tooth@email.com</p>
    </div>
    <div className='contact-info'>
        <FaFacebookF size={20}/>
        <p>facebook.com/sweeth-tooth</p>
    </div>
    <div className='contact-info'>
        <FaXTwitter size={20}/>
        <p>@sweetTooth</p>
    </div>
    <div className='contact-info'>
        <LuInstagram size={20}/>
        <p>@sweetToothOfficial</p>
    </div>
</div>

</div>
<center>
    
<hr/>

<div className='copy-right'>
    <p>By Malavika V</p>
</div>

</center>

</div>
)}

export default Footer
