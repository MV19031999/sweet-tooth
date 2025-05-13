import React, { useContext } from 'react'

import './ExploreMenu.css'
import {StoreContext} from '../../Context/StoreContext'

function ExploreMenu({ category, setCategory }) {

const { menuList } = useContext(StoreContext);

return (
<div className='explore-menu' id='explore-menu'>

<h1 className='explore-menu-title'>Explore our menu</h1>
<p className='explore-menu-para'>Select from a wide range of sweet, sweet treats. Our treats are indulgence perfected. Experiance delight in every bite and decadence at its finest. Enjoy unforgettable flavors.</p>

<div className='explore-menu-header'>
{menuList.map(
    (item, index) => {
        return(
            <div 
            key={index} 
            className='explore-menu-item'
            onClick={() => setCategory(prev => prev===item.name? 'All' : item.name)}>
                <img 
                src={item.image} 
                alt={item.name}
                className={category===item.name? 'active' : ''}/>
                <h3>{item.name}</h3>
            </div>
    )}
)}
</div>

<hr/>

</div>
)}

export default ExploreMenu
