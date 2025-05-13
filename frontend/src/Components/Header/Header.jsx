import React from 'react'
import { Link } from 'react-router-dom'

import './Header.css'

function Header() {
return (
<div className='header'>

<div className="header-contents">
    <h1>The Epitome of Sweet Luxury</h1>

    <p> Select from a wide range of yummy, delicious and mouth watering delicacies. Treat your sweet tooth with exclusive temptaions from Sweeth-Tooth</p>

    <h2>Delicious and Fun, Sweets for Everyone !!!</h2>

    <Link to='/#explore-menu'><button>View Menu</button></Link>
</div>

</div>
)}

export default Header
