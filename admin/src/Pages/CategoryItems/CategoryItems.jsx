import { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

import './CategoryItems.css';
import { AdminContext } from '../../Context/AdminContext';
import PopUpConfirm from "../../Components/PopUpConfirm/PopUpConfirm";



function CategoryItems({url}) {

const location = useLocation();
const navigate = useNavigate();
const category = location.state;

const [sweetList, setSweetList] = useState([]);

const {token} = useContext(AdminContext);

const [popUp, setPopUp] = useState(false);
const popUpResolver = useRef(null);

const getDelConfirmation = () => {
    return new Promise((resolve) => {
        popUpResolver.current = resolve;
        setPopUp(true);
    })
}

const handleDelResult = (result) => {
    setPopUp(false);
    if(popUpResolver.current){
        popUpResolver.current(result);
    }
}

const fetchSweetList = async () => {
    try{
        const response = await axios.get(`${url}/api/sweet/list`);
        // console.log(response.data.data)
        if(response.data.success){
            setSweetList(response.data.data);
        }
    } catch (error) {
        console.log(error)
    }
}

const updateAvail = async(id, avail) => {
    try{
        const response = await axios.patch(`${url}/api/sweet/avail/${id}`,{"available" : !avail}, { headers: {Authorization : `Bearer ${token}`}});
        await fetchSweetList();
        toast.success(response.data.message);
    } catch(err){
        console.log(err);        
        toast.error(err.response.data.message);

    }
}

const removeItem = async(id) => {
    const confirmation = await getDelConfirmation();
    if(confirmation){
    try{
        const response = await axios.delete(`${url}/api/sweet/delete/${id}`, { headers: {Authorization : `Bearer ${token}`}});
        await fetchSweetList();
        toast.success(response.data.message);
        
    } catch(error) {
        console.log(error);
        toast.error(error.response.data.message);
    }}
}

const handleUpdate = (item) => {
    navigate('/dash-board/update-item', { state: item});
}

useEffect(
    () => { fetchSweetList(); },
    [] )

return (
<div className='item-management'>

{ popUp && <PopUpConfirm handleDelResult={handleDelResult}/>}

<h1>Items Under {category?.name} Category</h1>

<div className='item-display'>

{ !sweetList.filter(item => item.category === category?.name).length 

?<p className='no-item-title-cat'>Add Sweet Items to view them here</p>

:

<table><tbody>
    <tr className='table-heading'>
        <td>Image</td>
        <td>Name</td>
        <td>Information</td>
        <td>Price</td>
        <td>Action</td>
    </tr>

{ sweetList.filter(item => item.category === category.name).map( (item, index) => {
    return(
    <tr className={`${ !item.available? "not-avl" : '' } card`} key={index}>

    <td>
        <img src={item.image} alt={item.name} className={ !item.available? "not-img" : '' }/>
    </td>

    <td className='name-data'>{item.name}</td>

    <td className='info-data'>
    <p>Category : {item.category}</p>
    <p>{item.description}</p>
    <p>Ingredients : {item.ingredients.join(", ")}</p>
    </td>

    <td>{item.price}</td>

    <td className='action-data'>
        <p className='item-availability'>
            <input 
                type="checkbox" 
                checked={item.available} 
                onChange={() => updateAvail(item._id, item.available)}/> 
            {item.available ? "Available" : "Unavailable"}
        </p>

        <button onClick={() => handleUpdate(item)}>
            <FaRegEdit size={30} />
        </button>

        <button onClick={() => removeItem(item._id)}>
            <FaRegTrashAlt size={30} />
        </button>
    </td>

    </tr>
    )}
)}
</tbody>
</table> }

</div>

</div>
)}

export default CategoryItems;
