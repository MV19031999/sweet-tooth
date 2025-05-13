import React,{ useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import NavBar from './Components/NavBar/NavBar'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Footer from './Components/Footer/Footer'
import Login from './Components/PopupUser/Login'
import SignUp from './Components/PopupUser/SignUp'
import Search from './Pages/Search/Search'
import About from './Pages/About/About'
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy'
import MyOrder from './Pages/MyOrders/MyOrder';
import ResetPassword from './Pages/ResetPassword/ResetPassword';


function App(){

const [showPopUp, setShowPopUp] = useState(false);
const [hasAccount, setHasAccount] = useState(true);

return (
<>

<ToastContainer />

{showPopUp &&
(
    hasAccount
    ? <Login setShowPopUp={setShowPopUp} setHasAccount={setHasAccount}/>
    : <SignUp setShowPopUp={setShowPopUp} setHasAccount={setHasAccount}/>
)}

<div className='app'>

<NavBar setShowPopUp={setShowPopUp} setHasAccount={setHasAccount} />

<Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/cart" element={<Cart/>} />
    <Route path="/search" element={<Search/>} />
    <Route path="/place-order" element={<PlaceOrder/>} />
    <Route path="/my-orders" element={<MyOrder/>} />
    <Route path='/reset-password' element={<ResetPassword/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
</Routes>

</div>

<Footer />
</>
)}

export default App

