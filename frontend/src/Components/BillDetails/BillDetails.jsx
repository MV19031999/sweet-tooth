import React, {useContext} from 'react'
import { Link } from 'react-router-dom';

import './BillDetails.css'
import {StoreContext} from '../../Context/StoreContext';


function BillDetails() {


const { bill, grandTotal } = useContext(StoreContext);

return (
<div className='bill-details'>

<div>
<h1>Bill Summary</h1>
<table className='bill'>
<tbody>
<tr className='bil-row-colored'>
    <td>Subtotal</td>
    <td>&#8377; {bill}</td>
</tr>

<tr>
    <td>Tax (@18%)</td>
    <td>&#8377; {Math.ceil(bill*0.18)}</td>
</tr>

<tr className='bil-row-colored'>
    <td>Delivery Fee</td>
    <td>&#8377; 50</td>
</tr>

<tr>
    <td>Packing Fee</td>
    <td>&#8377; 25</td>
</tr>

<tr className='bil-row-colored'>
    <td>Final Bill Amount</td>
    <td>&#8377; {grandTotal} </td>
</tr>
</tbody>
</table>

<Link to='/place-order'>
<button className='check-out-btn'>Proceed to Checkout</button>
</Link>
</div>

</div>
)}

export default BillDetails
