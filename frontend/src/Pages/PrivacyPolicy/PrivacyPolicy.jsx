import React, { useEffect } from 'react'

import './PrivacyPolicy.css'

function PrivacyPolicy() {

useEffect(
    () => {window.scroll(0,0)},
    []
)

return (
<div className='privacy-policy'>

<h1>Our Privacy Policy</h1>

<p>Welcome to Sweet-Tooth. By using our website or interacting with our services you agree to the practices described in our services.</p>

<ul>
<li> We collect personal information like name, email, address, and phone number when you use our website or services. </li>

<li> We use this information to provide you with our services, process orders, and communicate with you about your account or inquiries. </li>

<li> We implement security measures to protect your personal information from unauthorized access, disclosure, or alteration. </li>

<li> We may share your information with third-party service providers who help us operate our business, but only for the purposes outlined in this policy. </li>

<li> We store your personal information securely and retain it for as long as necessary to fulfill the purposes outlined in this policy. </li>

<li> You have the right to access, correct, or delete your personal information. </li>

<li> We comply with all applicable data privacy laws and regulations. </li>

<li> Our services are not intended for use by children under the age of 13, and we do not knowingly collect personal information from them. </li> 

<li> We may update this privacy policy from time to time, and we will post any changes on our website. </li>
</ul>

</div>
)}

export default PrivacyPolicy
