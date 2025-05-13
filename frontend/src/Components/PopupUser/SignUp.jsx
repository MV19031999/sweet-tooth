import React,{ useContext, useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { toast } from 'react-toastify';
import axios from 'axios';

import './PopupUser.css';
import { Link } from 'react-router-dom';
import {StoreContext} from '../../Context/StoreContext';

function SignUp({setShowPopUp, setHasAccount}) {

const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
})

const [showPwd, setShowPwd] = useState(false);


const { url } = useContext(StoreContext);

const dataInupt = (e) => {
    const { name, value } = e.target
    setData( (prev) => ({...prev, [name]:value}))
}

const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const response = await axios.post(`${url}/api/user/new`,data);
        if(response.data.success){
            toast.success("User Added. Please login.")
        }

        setData({
            name: "",
            email: "",
            password: ""
        });

        setHasAccount(true);

        
    } catch(error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
}

return (
<div className='popup'>

<div className="sign-up">

<h1>Create your account...</h1>

<div className="close-icon" onClick={() => setShowPopUp(false)}>
    <IoCloseSharp size={23}/>
</div>

<form className="sign-up-form password-position" onSubmit={handleSubmit}>
    <input 
        type="text" 
        placeholder='Enter your name...' required
        name="name"
        value={data.name}
        onChange={dataInupt}/>

    <input 
        type='email' 
        placeholder='Enter your email...' required
        name="email"
        value={data.email}
        onChange={dataInupt}/>

    <input 
        type={showPwd? "text" : "password"} 
        placeholder='Enter your password...' required
        name="password"
        value={data.password}
        onChange={dataInupt}/>
    
    <div 
        className='eyeReg' 
        onClick={() => setShowPwd(p => !p)}>
            {showPwd? <VscEyeClosed/>: <VscEye/>}
    </div>

    <label>
        <input type='checkbox' required/>
        By continuning, I agree to the 
        <Link to='/privacy-policy' className='link' onClick={() => setShowPopUp(false)}> 
        Terms of Use & Privacy Policy </Link>
    </label>

    <button type='submit'>Create Account</button>
</form>

<h2>
    Already have an account?  
    <span className='link' onClick={() => setHasAccount(true)}> Login </span>
</h2>

</div>

</div>
)}

export default SignUp
