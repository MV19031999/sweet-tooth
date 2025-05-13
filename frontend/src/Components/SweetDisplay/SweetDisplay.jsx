import React, {useContext} from 'react'

import {StoreContext} from '../../Context/StoreContext'
import './SweetDisplay.css'
import SweetItemCard from '../SweetItemCard/SweetItemCard'

function SweetDisplay({ category }) {

const {sweetList} = useContext(StoreContext);

return (
<div className='sweet-display'>
{
    sweetList
    .filter(item => item.available)
    .map(
       (sweet,index) => {
        if(category === 'All' || sweet.category === category){
            return(
                <SweetItemCard 
                    key={index}
                    id={sweet._id} 
                    name={sweet.name}
                    image={sweet.image}
                    price={sweet.price}
                    description={sweet.description}
                    ingredients={sweet.ingredients}
                    available={sweet.available} />
            )
        }
       })
}
</div>
)}

export default SweetDisplay
