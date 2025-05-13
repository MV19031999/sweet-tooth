import React,{ useState, useContext, useEffect, useRef } from "react"
import { FaRegImages } from "react-icons/fa"
import axios from "axios"
import { toast } from "react-toastify"
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

import './CategoryManagement.css'
import { AdminContext } from '../../Context/AdminContext';
import { useNavigate } from "react-router-dom";
import PopUpConfirm from "../../Components/PopUpConfirm/PopUpConfirm";

function CategoryManagement({url}) {

const {token} = useContext(AdminContext);
const navigate = useNavigate();

const [ newCatData, setNewCatData ] = useState({ name: "", image: "" });
const [ catInfo, setCatInfo ] = useState([]);

const [mode, setMode] = useState("add");
const [catId, setId] = useState("");

const [popUp, setPopUp] = useState(false);
const popUpResolver = useRef(null)

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

useEffect( () => {fetchCategory()}, [] )

const imageUpload = async (e) => {
    if(!e.target.files[0]){
        return;
    }
    const reader = new FileReader();
    await reader.readAsDataURL(e.target.files[0]);
    reader.onload = (successfulReadEvent) => {
        setNewCatData( (prev) => ({...prev, "image": successfulReadEvent.target.result}))
    }  
}

const textInput = (e) => {
    const { name, value } = e.target;
    setNewCatData( (prev) => ({...prev, [name]: value}))
}

const handleSubmit = async(e) => {
    if(newCatData.name && newCatData.image){
        e.preventDefault();
        try{
        const response = await axios.post(`${url}/api/category/add`, newCatData, { headers: {Authorization : `Bearer ${token}`}});
        setNewCatData({ name: "", image: ""});
        document.getElementById('fileInput').value = null;
        toast.success(response.data.message);
        fetchCategory();
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message);
    }}   
}

const fetchCategory = async() => {
    try{
        const response = await axios.get(`${url}/api/category/get`);
        if(response.data.success){
            setCatInfo(response.data.data);
        }
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message);
    }
}

const handleDelete = async(id) => {
    const confirmation = await getDelConfirmation();
    if(confirmation){
    try{
        const response = await axios.delete(`${url}/api/category/delete/${id}`, { headers: {Authorization : `Bearer ${token}`}});
        await fetchCategory();
        toast.success(response.data.message);
    } catch(error) {
        console.log(error);
        toast.error(error.response.data.message);
    }}
}

const handleMode = (c) => {
    setMode("edit"); 
    setId(c._id); 
    setNewCatData({ name: c.name, image: c.image });
}

const handleUpdate = async(e) => {
    if(newCatData.name && newCatData.image){
        e.preventDefault();
        try{
            const response = await axios.put(`${url}/api/category/update/${catId}`, newCatData, { headers: {Authorization : `Bearer ${token}`}});

            if(response.data.success){
                setNewCatData({ name: "", image: "" });
                setMode("add");
                fetchCategory();
            }
            toast.success(response.data.message);

    } catch (error) {
        toast.error(error.message);
    }}
}

const handleCatItems = (cat) => {
    navigate('/dash-board/category-items', { state: cat});
}

return (
<div className='cat-man'>

{ popUp && <PopUpConfirm handleDelResult={handleDelResult}/>}

<h1>Category Management</h1>

<div className='cat-container'>

<center>
<p className='sub-title'>
    {mode==="add"? 'Add Category' : 'Edit Category'}
</p>

<form>

<p className='input-field-title'>Upload Image</p>

<label className='image-selector'>
{newCatData.image
? <img src={newCatData.image} alt='image' className='image-final'/>
: <FaRegImages className='image-icon'/> }

{mode==="add"
? <input 
    className='file-input-cat'
    id='fileInput'
    type='file' 
    accept='.png, .jpg, .jpeg' 
    required
    onChange={(e) => imageUpload(e)}/>
: <input 
    className='file-input-cat'
    type='file'
    id='fileInput'
    accept='.png, .jpg, .jpeg' 
    onChange={(e) => imageUpload(e)}/>}
</label>

<p className='input-field-title'>Product Name</p>
<input 
    className='text-input' 
    type="text" required
    name="name"
    value={newCatData.name}
    onChange={textInput} />

{mode==="add" 
? <button className='submit' type="submit" onClick={handleSubmit}>Add New Category</button> 
: <div className="edit-buttons">
    <button className='submit' type="submit" onClick={handleUpdate}>Update</button>
    <button className='submit' type="button" onClick={()=>{setMode("add"); setNewCatData({ name: "", image: "" })}}>Cancel</button>
</div> 
}

</form>
</center>


<div>
<p className='sub-title'>Current Categories</p>
<div className="cat-display">
{ catInfo.map( (cat, index) => { return(
    <div className="cat-card" key={index}>
        <img src={cat.image} alt={cat.name} />
        <div className="cat-display-info">
            <button className='view-cat-items' onClick={() => handleCatItems(cat)}>
                {cat.name}
            </button>

            <button onClick={() => {handleMode(cat)}}>
                <FaRegEdit size={30} />
            </button>

            <button onClick={() => {handleDelete(cat._id)}}>
                            <FaRegTrashAlt size={30} />
            </button>
        </div>
    </div>
)})}
</div>
</div>

</div>

    
</div>
)}

export default CategoryManagement
