import { useContext, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaRegImages } from "react-icons/fa"
import { MdDeleteOutline } from "react-icons/md"
import { FaExclamation } from "react-icons/fa"
import axios from 'axios'
import { toast } from 'react-toastify'


import './UpdateItem.css'
import { AdminContext } from '../../Context/AdminContext';

function UpdateItem({url}) {

const location = useLocation();
const navigate = useNavigate();
const item = location.state;
const {token} = useContext(AdminContext);

const [category, setCategory] = useState([]);


useEffect( () => {fetchCategory()}, [] )


const fetchCategory = async() => {
    try{
        const response = await axios.get(`${url}/api/category/get`);
        if(response.data.success){
            setCategory(response.data.data);
        }
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message);
    }
}

const [ newSweetData, setNewSweetData ] = useState({
    name: item.name,
    image: item.image,
    price: item.price,
    description: item.description,
    ingredients: item.ingredients,
    category: item.category,
})

const textInput = (e) => {
    const { name, value, type } = e.target;

    if(type === "number"){
        const numValue = parseInt(value);
        setNewSweetData( (prev) => ({...prev, [name]: numValue}))
        return;
    }
    setNewSweetData( (prev) => ({...prev, [name]: value}))
}

const imageUpload = async (e) => {
    if(!e.target.files[0]){
        return;
    }
    const reader = new FileReader();
    await reader.readAsDataURL(e.target.files[0]);
    reader.onload = (successfulReadEvent) => {
        setNewSweetData( (prev) => ({...prev, "image": successfulReadEvent.target.result}))
    }
    
}

const ingredientInput = (e,index) => {
    let temp = [...newSweetData.ingredients];
    temp[index] = e.target.value;
    setNewSweetData( (prev) => ({...prev, "ingredients": temp}))
    if(newSweetData.ingredients.length == 1){
        document.getElementById('no-ingredient-error').style.visibility = 'hidden'; }
}

const ingredientRemove = (index) => {
    let temp = [...newSweetData.ingredients];
    temp.splice(index,1);
    setNewSweetData( (prev) => ({...prev, "ingredients": temp}))
}

const handleSubmit = async(submitEvent) => {
    submitEvent.preventDefault();

    if(!newSweetData.ingredients.length){
        document.getElementById('no-ingredient-error').style.visibility = 'visible';
        return;
    }

    try{
        const response = await axios.put(`${url}/api/sweet/update/${item._id}`, newSweetData, { headers: {Authorization : `Bearer ${token}`}});

        setNewSweetData({
            name: "",
            image: "",
            price: "",
            description: "",
            ingredients: [],
            category: "",
        })

        toast.success(response.data.message);
        navigate('/dash-board/item-management');

    } catch (error) {
        toast.error(error.message);
    }
}

return (
<div className='update-item'>

<h1>Update Product Data</h1>

<form onSubmit={handleSubmit}>

<div>
    <p className='input-field-title'>Upload Image</p>
    <label className='image-selector'>
        {newSweetData.image
        ? <img src={newSweetData.image} alt='image' className='image-final'/>
        : <FaRegImages className='image-icon'/> }

        <input 
            className='file-input'
            type='file' 
            accept='.png, .jpg, .jpeg' 
            onChange={(e) => imageUpload(e)}/>
    </label>

    <p className='input-field-title'>Product Category</p>
    <select className='category-selector' required onInput={textInput} value={newSweetData.category} name="category">
        <option value="" hidden></option>
                    { category.map( (c,index) => { return(
            <option value={c.name} key={index}>{c.name}</option>
        )})}

{/* 
        <option value="Traditional">Traditional</option>
        <option value="Doughnut">Doughnut </option>
        <option value="Beverage">Beverage</option>
        <option value="Cup-Cakes">Cup-Cakes</option>
        <option value="Macaroons">Macaroons</option>
        <option value="Pudding">Pudding</option>
        <option value="Sorbet">Sorbet</option> */}
    </select>
</div>

<div>
    <p className='input-field-title'>Product Name</p>
    <input 
        className='text-input' 
        type="text" required
        name="name"
        value={newSweetData.name}
        onChange={textInput}/>

    <p className='input-field-title'>Product Price</p>
    <input 
        className='text-input' 
        type="number" 
        min={10} required
        name="price"
        value={newSweetData.price}
        onChange={textInput}/>

    <p className='input-field-title'>Product Decription</p>
    <textarea 
        rows={3} required
        name="description"
        value={newSweetData.description}
        onChange={textInput}/>
</div>

<div>
    <p className='input-field-title'>Allergen Information</p> 

    {newSweetData.ingredients.map(
        (item, index) => {
        return(
            <div className='ingredient-input' key={index}>
                <input 
                    type='text'
                    value={item}
                    onChange={ (e) => {ingredientInput(e,index)} }
                    required/>
                <button 
                    type='button'
                    onClick={() => {ingredientRemove(index)}}
                    className='delete-ingredient'> <MdDeleteOutline/> </button>
            </div>
        )}
    )}

    <button
        type="button" 
        className='add-ingredient'
        onClick={() => { 
            setNewSweetData((prev) => ({...prev, "ingredients":[...prev.ingredients, '']}))

            }}>
    Add Ingredient </button>

    <div id='no-ingredient-error'>
        <FaExclamation id='error-exclamation'/> 
        Allergen information not added.
    </div>
    
        
</div>

<button className='submit' type="submit">Update Product</button>
    

</form>


</div>
)}

export default UpdateItem
