import { createContext, useEffect, useState, useRef } from 'react'
// import { sweetListData, menuList } from '../Assets/Assets';
import axios from 'axios';
import { toast } from 'react-toastify';

export const StoreContext = createContext();

function StoreContextFunction(props) {

const url = "http://localhost:8080";

const [token, setToken] = useState("");

useEffect(
    () => {
        const loadData = async() => {
            //Getting Menu List Info
            await fetchCategory();

            //Getting Sweet List Info
            await fetchSweetList();

            if(localStorage.getItem("token")){ 
                //Keeping user logged in on refresh
                setToken(localStorage.getItem("token"));

                //Keeping cart on refresh
                await loadCartData(localStorage.getItem("token"));
            }
        };
        loadData();
    },[]
)

const [ sweetList, setSweetlist ] = useState([]);
const [menuList, setMenuList] = useState([]);

const fetchSweetList = async() => {
    try{
        const response = await axios.get(`${url}/api/sweet/list`)
        if(response.data.success){
            setSweetlist(response.data.data)
        }
    } catch(err) {
        console.log(err);
    }
}

const fetchCategory = async() => {
    try{
        const response = await axios.get(`${url}/api/category/get`);
        if(response.data.success){
            setMenuList(response.data.data);
        }
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message);
    }
}


const [cart, setCart] = useState({});

const loadCartData = async(t) => {
    try{
         const response = await axios.get(`${url}/api/cart/get`, { headers: { authorization: `Bearer ${t}`}})
        if(response.data.success){
            setCart(response.data.data)
        }
    } catch(err) {
      console.log(err);
    }
}

const addToCart = async(itemId) => {
    if(token){
    try{
        const response = await axios.post(
                `${url}/api/cart/addOne`, 
                {"itemId" : itemId},
                { headers: { authorization: `Bearer ${token}`}})
            
        if(!cart[itemId]){ setCart(prev => ({...prev, [itemId]: 1})); } 
        else { setCart(prev => ({...prev, [itemId]: prev[itemId] + 1})); }

    } catch (err){
        console.log(err);
    }} else {
        toast.error("Action not allowed. Please Login to continue.")
    }
}

const removeFromCart = async(itemId) => {
    if(token){
        const response = await axios.post(
                `${url}/api/cart/removeOne`, 
                {"itemId" : itemId},
                { headers: { authorization: `Bearer ${token}`}});
        
        setCart(prev => ({...prev, [itemId]: prev[itemId] - 1}));
    } else {
        toast.error("Error. Please Login again.")
    }
}

const deleteCartItem = async(itemId) => {
    if(token){
        const response = await axios.post(
                `${url}/api/cart/delete`, 
                {"itemId" : itemId},
                { headers: { authorization: `Bearer ${token}`}});

        setCart(prev => ({...prev, [itemId]: 0}));
    } else {
        toast.error("Error. Please Login again.")
    }
}

let bill = 0;
for(let item in cart){
    let sweet = sweetList.find((s) => {return(item === s._id)});
    if(sweet?.available){
    bill += (sweet.price * cart[item])}
}

const grandTotal = Math.ceil((bill * 1.18) + 75);

let netItems = 0;
for(let item in cart){
    let sweet = sweetList.find((s) => {return(item === s._id)});
    if(sweet){
    netItems += (cart[item]);}
}



const contextValue = {
    cart,
    setCart,
    addToCart,
    removeFromCart,
    deleteCartItem,
    bill,
    url,
    token, 
    setToken,
    sweetList,
    menuList,
    grandTotal,
    loadCartData,
    netItems
}

return (
<StoreContext.Provider value={contextValue}>
    {props.children}
</StoreContext.Provider>
)}

export default StoreContextFunction
