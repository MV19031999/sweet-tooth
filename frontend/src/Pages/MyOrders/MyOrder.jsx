import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import './MyOrder.css'
import {StoreContext} from '../../Context/StoreContext'
import OrderCard from '../../Components/OrderCard/OrderCard'
import boxClosed from '../../Assets/SiteImages/boxClosed.jpg'
import boxOpened from '../../Assets/SiteImages/boxOpened.png'
import noOrders from '../../Assets/SiteImages/noOrd.jpg'


function MyOrder() {

const { token, url } = useContext(StoreContext);

const [orders, setOrders] = useState([]);

const loadUserOrder = async(token) => {
    try{
    const response = await axios.get(`${url}/api/order/userOrders`, { headers: { Authorization: `Bearer ${token}`}})
    if(response.data.success){ setOrders(response.data.data); }
} catch(err) {
    console.log(err);
    toast.error(err.response.data.message);
}}

useEffect(
    () => {
        if(token){
            loadUserOrder(token);
        }
    }, [token]
)

const pending =  orders.filter(ord => (ord["status"] != "Order Delivered"))
const completed = orders.filter(ord => (ord["status"] === "Order Delivered"))

return (
<div className='my-orders'>

{ pending.length ?
<>
<h1 style={{"marginBottom":"20px"}}>My Orders</h1>
<h2>Pending Orders</h2>
{pending
    .map( (ord,index) => {
        return(
            <OrderCard key={index} items={ord.items} amount={ord.amount} address={ord.address} status={ord.status} box={boxClosed} fetch={loadUserOrder}/> )}
)} </> :  
<center className='no-orders'>
        <p>You do not have any pending orders. But its a good time to place one.</p>
        <Link to='/#explore-menu'>
        <img src={noOrders} alt="no-orders"/><br/>
        Order someting now !!!</Link>
</center> }

{completed.length ? 
<>
<h2>Completed Orders</h2>
{completed
    .map( (ord,index) => {
        return(
            <OrderCard key={index} items={ord.items} amount={ord.amount} address={ord.address} status={ord.status} box={boxOpened} /> )}
)} </> : <></> }

</div>
)}

export default MyOrder;
