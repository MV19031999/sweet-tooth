import {useContext} from 'react'

import './OrderCard.css'
import {StoreContext} from '../../Context/StoreContext'

function OrderCard( {items, amount, address, status, box, fetch} ) {

const { token } = useContext(StoreContext);

return (
<div className='order-card'>
    <center className='info-status'>
    <img src={box} alt="box" />
    <h3>
        Order Status : <br/>
        {status}
    </h3>
    </center>

    <div className='info-items'>
        <h3 className='line'>Ordered Items</h3>
        <ul>
        { items.map( (i, index) => {
            return(
                <li key={index}>{i.name} x {i.quantity} nos.</li>
        )} )}
        </ul>
        <p className='bill'>Bill Total : Rs. {amount}</p>
    </div>

    <div className='info-address'>
        <h3 className='line'>Deliver Address</h3>
        <p>{address.firstName} {address.lastName}</p>
        <p>{address.address}</p>
        {status != "Order Delivered" ? 
        <button className="track" onClick={() => fetch(token)}>Track Order</button>
        : <></>
        }
    </div>
</div>
)}

export default OrderCard
