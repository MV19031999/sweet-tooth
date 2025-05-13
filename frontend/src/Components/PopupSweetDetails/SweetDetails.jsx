import React,{useContext} from 'react'
import { IoCloseSharp } from "react-icons/io5"

import './SweetDetails.css'
import {StoreContext} from '../../Context/StoreContext';

function SweetDetails({id, name, image, price, description, ingredients, showDetail, setShowDetail}) {

const {cart, addToCart, removeFromCart} = useContext(StoreContext);

return (
<div className='sweet-details-popup'>

<div className="sweet-details">

<div className='sweet-details-flex'>
    <div className='sweet-details-image'>
    <img src={image} alt={name} />
    </div>

    <div className='sweet-details-content'>
    <h1>{name}</h1>
    <h2>(@ Rs. {price})</h2>
    <p>{description}</p>
    <p>Allergen Information. Ingredients Used: </p>
    <ul>
    {
    ingredients.map((i,index) => <li key={index}>{i}</li>) 
    }
    </ul>
    </div>
</div>

<center className="sweet-details-counter">
{ !cart[id] 
    ? <button onClick={() => {addToCart(id)}}>Add to Cart</button>
    : <>
        <button onClick={() => {addToCart(id)}}>Add</button> 
        <span>{cart[id]}</span> 
        <button onClick={() => {removeFromCart(id)}}>Remove</button>
      </>
}
</center>

<div className="close" onClick={() => setShowDetail(false)}>
    <IoCloseSharp size={23}/>
</div>
</div>

</div>
)}

export default SweetDetails
