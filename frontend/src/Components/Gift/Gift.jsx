import React from 'react'

import './Gift.css'
import customOrder from '../../Assets/SiteImages/customOrder.png'
import coupon from '../../Assets/SiteImages/coupon.png'

function Gift() {
return (
<div className='gift' id='gift'>
<center>
<h1>Celebrate your sweet occasions and happy moments with us. Custom orders and gift vouchers now available in-store at Sweet-Tooth</h1>

<div className='image-conatiner'>
<img src={coupon} alt="Coupon" className='custom-order-coupon-logo'/>
<img src={customOrder} alt="Custom Order" className='custom-order-coupon-logo'/>
</div>
</center>

</div>
)}

export default Gift
