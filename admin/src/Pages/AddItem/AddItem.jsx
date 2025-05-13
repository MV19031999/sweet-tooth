import React, { useContext, useState, useEffect } from 'react'
import { FaRegImages } from "react-icons/fa"
import { MdDeleteOutline } from "react-icons/md"
import { FaExclamation } from "react-icons/fa"
import axios from 'axios'
import { toast } from 'react-toastify'


import './AddItem.css'
import { AdminContext } from '../../Context/AdminContext';

function AddItem({url}) {

const {token} = useContext(AdminContext);

const [ newSweetData, setNewSweetData ] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    ingredients: [],
    category: "",
})

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
        const response = await axios.post(`${url}/api/sweet/add`, newSweetData, { headers: {Authorization : `Bearer ${token}`}});

        setNewSweetData({
            name: "",
            image: "",
            price: "",
            description: "",
            ingredients: [],
            category: "",
        })

        document.getElementById('fileInput').value = null;

        toast.success(response.data.message);


    } catch (error) {
        toast.error(error.message);
    }
}

return (
<div className='add-item'>

<h1>New Product Addition</h1>

<form onSubmit={handleSubmit}>

<div>
    <p className='input-field-title'>Upload Image</p>
    <label className='image-selector'>
        {newSweetData.image
        ? <img src={newSweetData.image} alt='image' className='image-final'/>
        : <FaRegImages className='image-icon'/> }

        <input 
            className='file-input'
            id='fileInput'
            type='file' 
            accept='.png, .jpg, .jpeg' 
            required
            onChange={(e) => imageUpload(e)}/>
    </label>

    <p className='input-field-title'>Product Category</p>
    <select className='category-selector' required onInput={textInput} value={newSweetData.category} name="category">
        <option value="" hidden></option>

        { category.map( (c,index) => { return(
            <option value={c.name} key={index}>{c.name}</option>
        )})}

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

<button className='submit' type="submit">Add New Product</button>
    

</form>


</div>
)}

export default AddItem
