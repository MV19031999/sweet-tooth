import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import './Cart.css'
import {StoreContext} from '../../Context/StoreContext'
import noCart from '../../Assets/SiteImages/noCart.png'
import Gear from '../../Components/Gears/Gear'
import BillDetails from '../../Components/BillDetails/BillDetails'
import CartDetails from '../../Components/CartDetails/CartDetails'

function Cart() {

const { netItems, bill } = useContext(StoreContext);

return (
<div className='cart'>

{ !netItems ? 

<center className='nothing-in-cart'>
<h1>Aww, snap!!</h1>
<h1>Your cart is currently empty.</h1>
<img src={noCart} alt='Cart Empty' width={250} />
<h1>
    Check out our delicious sweeties 
    <br/>
    <Link to="/#explore-menu">here!!</Link>
</h1>
</center>

:

<>
<div>
    <CartDetails/>
</div>

{ bill?
<div className="bill-total">
    <div> <BillDetails /> </div>
    <div> <Gear/> </div>
</div>
: <></>
}


</>
}

</div>
)}

export default Cart
