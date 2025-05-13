import React, { useContext, useState } from 'react'
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";

import './SweetItemCard.css'
import SweetDetails from '../PopupSweetDetails/SweetDetails';
import {StoreContext} from '../../Context/StoreContext';

function SweetItemCard({ id, name, image, price, description, ingredients, available} ) {

const {cart, addToCart, removeFromCart} = useContext(StoreContext);

const [showDetail, setShowDetail] = useState(false);

return (
<>

{
    showDetail
    ? <SweetDetails 
        id = {id} 
        name = {name} 
        image = {image} 
        price = {price} 
        description = {description}
        ingredients = {ingredients}
        showDetail = {showDetail} 
        setShowDetail = {setShowDetail} /> 
    : <></>

}

<div className='sweet-item-card'>

{
available ? <></> :
<div className='not-available'>
    <h1>Not Available</h1>
</div>
}

<div className="sweet-card-image">

<img src={image} alt={name} onClick={() => setShowDetail(true)}/>

<div className='counter'>
{!cart[id]
?
<div onClick={() => addToCart(id)} className='add-item'>
    <FiPlus size={25} />
</div>
:
<div className='add-minus-counter'>
    <div onClick={() => addToCart(id)} className='add-count'>
        <FiPlus size={20} /> 
    </div>
    <h2>{cart[id]}</h2> 
    <div onClick={() => removeFromCart(id)} className='minus-count'>
        <FiMinus size={20}/> 
    </div>
</div>
}
</div>
    
</div>


<div className="sweet-card-text">
    <h2 onClick={() => setShowDetail(true)}> {name} </h2>
    <h3> Rs. {price} </h3>
</div>

</div>

</>
)}

export default SweetItemCard
