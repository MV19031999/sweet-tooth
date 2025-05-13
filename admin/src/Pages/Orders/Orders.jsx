import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

import './Orders.css'
import boxClosed from '../../Assets/boxClosed.jpg'
import boxDelivered from '../../Assets/boxDelivered.png'
import {AdminContext} from '../../Context/AdminContext'

function Orders({url}) {

const { token } = useContext(AdminContext);
const [orders, setOrders] = useState([]);

const loadAllOrder = async(token) => {
    try{
        const response = await axios.get(`${url}/api/order/allOrders`, { headers: { Authorization: `Bearer ${token}`}})
        if(response.data.success){ setOrders(response.data.data); }
    } catch(err) {
        console.log(err);
        toast.error(err.response.data.message);
}}

useEffect(
    () => {
        if(token){
            loadAllOrder(token);
        }
    }, [token]
)

const pending =  orders.filter(ord => (ord["status"] != "Order Delivered"));
const completed = orders.filter(ord => (ord["status"] === "Order Delivered"));

const handleStatusChange = async(e, id) => {
    try{
        const response = await axios.patch(`${url}/api/order/update/${id}`, {"status" : e.target.value}, { headers: { Authorization: `Bearer ${token}`}})
        if(response.data.success){
            toast.success(response.data.message);
            loadAllOrder(token);}
    } catch(err){
            console.log(err)
            toast.success(err.response.data.message);

    }
}

return (
<div className='orders'>

<h1>Order Management and Information</h1>

{ pending.length ?
<>
<p className='sub-title'>Pending Orders</p>
{pending
.map( (ord, index) => {
return(
    <div key={index} className='order-card'>
    <center className='info-status'>
        <img src={boxClosed} alt="box" />
        <p className='title'> Order Status : </p>
        <select className='order-status-select' value={ord.status} onChange={ (e) => handleStatusChange(e, ord._id)}>
            <option value='Order Accepted'>Order Accepted</option>
            <option value='Food Preparation'>Food Preparation</option>
            <option value='Out For Delivery'>Out For Delivery</option>
            <option value='Order Delivered'>Order Delivered</option>
        </select>
    </center>

    <div className='info-items'>
        <p className='line title'>Ordered Items</p>
        <ul>
        { ord.items.map( (i, index) => {
            return(
                <li key={index}>{i.name} x {i.quantity} nos.</li>
        )} )}
        </ul>
        <br/>
        <p className='bill'>Bill Total : Rs. {ord.amount}</p>
    </div>

    <div className='info-address'>
        <p className='line title'>Deliver Address</p>
        <p>{ord.address.firstName} {ord.address.lastName}</p>
        <p>{ord.address.address}</p>
        <br/>
        <p className='line title'>Contact Information</p>
        <p>{ord.address.number}</p> 
        <p>{ord.address.email}</p>

    </div>
    </div> )}
)} 
</> 

: <p className='sub-title'>No Pending Orders</p>
}


{completed.length ? 
<>
<p className='sub-title'>Completed Orders</p>
{completed
.map( (ord, index) => {
return(
    <div key={index} className='order-card'>
    <center className='info-status'>
        <img src={boxDelivered} alt="box" /><br/>
        <p className='title'> 
            Order Status : <br />
            {ord.status}</p>
    </center>

    <div className='info-items'>
        <p className='line title'>Ordered Items</p>
        <ul>
        { ord.items.map( (i, index) => {
            return(
                <li key={index}>{i.name} x {i.quantity} nos.</li>
        )} )}
        </ul>
        <br/>
        <p className='bill'>Bill Total : Rs. {ord.amount}</p>
    </div>

    <div className='info-address'>
        <p className='line title'>Deliver Address</p>
        <p>{ord.address.firstName} {ord.address.lastName}</p>
        <p>{ord.address.address}</p>
        <br/>
        <p className='line title'>Contact Information</p>
        <p>{ord.address.number}</p> 
        <p>{ord.address.email}</p>

    </div>
    </div> )}
)} 
</> 
: <></> }

</div>
)}

export default Orders
