import React from 'react'
import { FaGear } from "react-icons/fa6"

import './Gear.css'

function Gear() {
return (
<center className='gear'>

<h1>Final Bill Amount processed...</h1>
<h2>Please procceed to checkout...</h2>

<FaGear size={110} className='one'/>
<FaGear size={130} className='two'/>

</center>
)}

export default Gear
