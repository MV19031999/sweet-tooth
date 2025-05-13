import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

function AdminContextFunction(props) {

const [token, setToken] = useState();

useEffect(
    () => {
        if(localStorage.getItem("token")){ 
            //Keeping admin logged in on refresh
            setToken(localStorage.getItem("token"));
    }}
)

const contextValue = {
    token,
    setToken
}

return(
<AdminContext.Provider value={contextValue}>
    {props.children}
</AdminContext.Provider>
)}

export default AdminContextFunction