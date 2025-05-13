import React, {useContext} from 'react'
import { IoCloseSharp } from "react-icons/io5"
import { FiPlus } from "react-icons/fi"
import { FiMinus } from "react-icons/fi"

import './CartDetails.css'
import {StoreContext} from '../../Context/StoreContext'

function CartDetails() {

const {cart, addToCart, removeFromCart, deleteCartItem, sweetList} = useContext(StoreContext);


return (
<div className="cart-table">

<div className='cart-table-heading cart-row'>
    <p>Item</p>
    <p>Title</p>
    <p>Price</p>
    <p>Quntity</p>
    <p>Total</p>
    <p>Remove</p>
</div>

{
sweetList.map( (sw, index) => {
        if(cart[sw._id]){
        return(
        <div key={index} className='cart-row cart-product-row'>
            <p>
                <img src={sw.image} alt={sw.name} className={!sw.available? "not-img" : ''}/>
            </p>

            <p>{sw.name}</p>


            { !sw.available?
                <p className='not-text'>Item currently unavailable</p> :
                <>
                <p>&#8377; {sw.price}</p>

                <p className='quantity-tracker'>
                    <FiPlus onClick={() => addToCart(sw._id)} className='icons plus'/>
                    {cart[sw._id]}
                    <FiMinus onClick={() => removeFromCart(sw._id)} className='icons minus'/>
                </p>

                <p>&#8377; {(sw.price)*(cart[sw._id])} </p>
                </>

            }

            <p 
            onClick={() => deleteCartItem(sw._id)}>
                <IoCloseSharp className='icons'/>
            </p>

        </div> )}
    })
}

</div>
)}

export default CartDetails
