import React, {useState, useContext, useEffect} from 'react'
import { IoCloseSharp } from "react-icons/io5"
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { toast } from 'react-toastify';
import axios from 'axios'


import './PopupUser.css'
import {StoreContext} from '../../Context/StoreContext'


function Login({ setShowPopUp, setHasAccount }) {

const [data, setData] = useState({
    email: "",
    password: ""
})

const [showPwd, setShowPwd] = useState(false);

const { url, token, setToken, loadCartData } = useContext(StoreContext);


const dataInupt = (e) => {
    const { name, value } = e.target
    setData( (prev) => ({...prev, [name]:value}))
}


const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const response = await axios.post(`${url}/api/user/login`,data);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("email", response.data.email);
            await loadCartData(response.data.token);
            setShowPopUp(false);
        }
        
    } catch(error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
}
return (
<div className='popup'>

<div className="login">

<h1>Login to your account...</h1>

<div className="close-icon" onClick={() => setShowPopUp(false)}>
    <IoCloseSharp size={23}/>
</div>

<form className="login-form password-position" onSubmit={handleSubmit}>
    <input 
        type="email" 
        placeholder='Email ID...' required
        name="email"
        value={data.email}
        onChange = {dataInupt}/>
    <input 
        type={showPwd? "text" : "password"} 
        placeholder='Password...' required
        name="password"
        value={data.password}
        onChange = {dataInupt}/>
    <div 
        className='eyeLogin' 
        onClick={() => setShowPwd(p => !p)}>
            {showPwd? <VscEyeClosed/>: <VscEye/>}
    </div>
    

    <button type='submit'>Login</button>
</form>

<h2>
    Don't have an account? 
    <span className='link' onClick={() => setHasAccount(false)}> Sign Up! </span>
</h2>

</div>

</div>
)}

export default Login
