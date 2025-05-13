import axios from "axios"
import { useState, useContext } from "react"
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";

import './ResetPassword.css'
import { StoreContext } from "../../Context/StoreContext";

function ResetPassword() {

const [data, setData] = useState({currPwd:"", newPwd: "", retype:""});
const [showPwd, setShowPwd] = useState({currPwd: false, newPwd: false, retype: false});
const {token, setToken, url, setCart} = useContext(StoreContext);
const navigate = useNavigate();

const handleInput = (e) => {
    const {name, value} = e.target;
    setData( prev => ({...prev, [name]:value}))
}

const changeFieldType = (name) => {
    setShowPwd( prev => ({...prev, [name]: !prev[name]}))
}

const handleSubmit = async(e) => {
    e.preventDefault();
    if(data.newPwd === data.retype){
        try{
        const response = await axios.patch(`${url}/api/user/passwordReset`, data,{ headers: {Authorization : `Bearer ${token}`}} )
        if(response.data.success){
            toast.success(response.data.message); 
            //Logout
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("email");
            setToken("");
            setCart({});
            navigate("/");
        }} catch(err) {
            console.log(err);
            toast.error(err.response.data.message);
    }} else {
            toast.error("Error in password retype!");
    }
}

return (
<div className="password-reset">
<h1>Password Reset</h1>
<form onSubmit={handleSubmit} className="password-reset-form">
    <div className="input-field-title-pwd"> Current Password <br/>
    <input 
        required
        type={showPwd.currPwd? "text" : "password"} 
        name="currPwd" 
        value={data.currPwd} 
        onChange={handleInput} />
    <div className='password-setting' onClick={() => changeFieldType("currPwd")}>
        {showPwd.currPwd? <VscEye size={30}/>: <VscEyeClosed size={30}/>}
    </div>
    </div>

    <div className="new-pwd-fields">

    <div className="input-field-title-pwd">New Password <br/>
    <input 
        required
        type={showPwd.newPwd? "text" : "password"}
        name="newPwd" 
        value={data.newPwd} 
        onChange={handleInput} />
    <div className='password-setting' onClick={() => changeFieldType("newPwd")}>
        {showPwd.newPwd? <VscEye size={30}/>: <VscEyeClosed size={30}/>}
    </div>
    </div>

    <div className="input-field-title-pwd">Retype New Password <br/>
    <input 
        required
        type={showPwd.retype? "text" : "password"} 
        name="retype" 
        value={data.retype} 
        onChange={handleInput} />
    <div className='password-setting' onClick={() => changeFieldType("retype")}>
        {showPwd.retype? <VscEye size={30}/>: <VscEyeClosed size={30}/>}
    </div>
    </div>

    </div>

    <button type="submit"> Reset Password</button>
</form>


</div>
)}

export default ResetPassword
