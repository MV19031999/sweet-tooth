import React, { useContext, useState } from 'react'
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import './Login.css'
import logo from '../../Assets/logoAdmin.png'
import { AdminContext } from '../../Context/AdminContext';

function Login({url}) {

const [data, setData] = useState({ email: "", password: ""});
const [showPwd, setShowPwd] = useState(false)
const navigate = useNavigate();
const {token, setToken} = useContext(AdminContext);

const handelInput = (e) => {
    const { name, value } = e.target;
    setData(prev => ({...prev, [name]: value}))
}

const handleSubmit = async (e) => {
    e.preventDefault();
e.preventDefault();
    try{
        const response = await axios.post(`${url}/api/user/login`,data);
        if(response.data.success){
            localStorage.setItem("token", response.data.token);
            setToken(response.data.token);
            setData({ email: "", password: ""})
            navigate("/dash-board")
        }
    } catch(error) {
        console.log(error);
        toast.error(error.response.data.message);
    }

}

return (

<center className='login'>

<div className="login-contents">

<img src={logo} alt="Logo" />

<form className='admin-login-form' onSubmit={handleSubmit}>

<input 
    type='email' 
    placeholder='Enter Admin Email ID' required
    name="email"
    value={data.email}
    onChange={handelInput}/>

<input 
    type={showPwd? "text" : "password" }
    placeholder='Enter password' required
    name="password"
    value={data.password}
    onChange={handelInput}/>

<div 
    className='eye' 
    onClick={() => setShowPwd(p => !p)}>
        {showPwd? <VscEyeClosed/>: <VscEye/>}
</div>

<button type='submit'>Login</button>
</form>

</div>

</center>
)}

export default Login
