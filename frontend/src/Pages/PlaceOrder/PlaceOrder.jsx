import React, { useContext, useState, useEffect, useRef } from 'react'
import {StoreContext} from '../../Context/StoreContext'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import './PlaceOrder.css'
import PaymentStimulator from '../../Components/PaymentStimulator/PaymentStimulator'

function PlaceOrder() {

const navigate = useNavigate();

useEffect(
    () => {window.scroll(0,0)},
    []
)

const { grandTotal, cart, sweetList, url, token, setCart } = useContext(StoreContext);

const [delInfo, setdelInfo] = useState({
    "firstName" : "",
    "lastName" : "",
    "email" : localStorage.getItem("email"),
    "number" : "",
    "address" : ""
})

const handleInput = (e) => {
    const { name, value } = e.target;
    setdelInfo(prev => ({...prev, [name]:value}));
}

const [showPopUp, setShowPopUp] = useState(false);
const paymentStatus = useRef(null)

const showPaymentPopUp = () => {
    return new Promise( (resolve) => {
        paymentStatus.current = resolve;
        setShowPopUp(true);
    }
)}

const handlePaymentStatus = (result) => {
    setShowPopUp(false);
    if(paymentStatus.current){
        paymentStatus.current(result);
}}

const handleSubmit = async(e) => {
    e.preventDefault();

    const payment = await showPaymentPopUp();

    if(payment){

        let orderItems = [];
        { sweetList.map( (item,index) => {
            if((cart[item._id] > 0) && item.available){
                let tempItemInfo = item;
                tempItemInfo["quantity"] = cart[item._id];
                orderItems.push(tempItemInfo);
            }})}

        const data = {
            "items": orderItems,
            "address": delInfo,
            "payment": payment,
            "amount": grandTotal
        }

        try{
            const response = await axios.post(
                `${url}/api/order/new`, 
                data, 
                { headers: { Authorization : `Bearer ${token}`}});
            toast.success(response.data.message);

            setCart({});
            setdelInfo({ "firstName" : "", "lastName" : "",  "email" : "", "number" : "", "address" : "" });
            navigate("/my-orders");

        } catch(err) {
            console.log(err);
            toast.error("Internal Server Error");
        }
    } else {
        toast.error("Payment failed. Please try again");
    }
}

return (
<>

{ showPopUp &&
 <PaymentStimulator handlePaymentStatus={handlePaymentStatus} /> }

<form className='place-order' onSubmit={handleSubmit}>

<h1>
    Delivery Information
    {Object.keys(cart).length? <div style={{"float": "right"}}>Grand Total : Rs. {grandTotal}</div> : <></>}
    
</h1>

<div className='input-fields'>

<input 
    type="text" required
    placeholder='First Name'
    name="firstName"
    value={delInfo.firstName}
    onChange={handleInput}/>

<input 
    type="text" required
    placeholder='Last Name'
    onChange={handleInput}
    name="lastName"
    value={delInfo.lastName}/>

<input 
    type="email" required
    placeholder='Contact Email ID'
    onChange={handleInput}
    name="email"
    value={delInfo.email}/>

<input 
    type="text" required
    placeholder='Contact Phone Number' 
    minLength={10} maxLength={10}
    onChange={handleInput}
    name="number"
    value={delInfo.number}/>

<textarea 
    placeholder='Delivery Address' rows={3}
    required
    onChange={handleInput}
    name="address"
    value={delInfo.address}/>

</div>

<center>
<button type="submit">Proceed to Pay</button>
</center>

</form>
</>
)}

export default PlaceOrder
