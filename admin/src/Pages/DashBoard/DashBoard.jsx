import React from 'react'

import './DashBoard.css'
import SideBar from '../../Components/SideBar/SideBar'
import { Outlet } from 'react-router-dom'

function DashBoard() {
return (
<div className='dash-board'>
    <SideBar/>
    <Outlet/>
</div>
)}

export default DashBoard
