import React, { useEffect, useState, useContext } from 'react'
import { FiSearch } from "react-icons/fi"

import './Search.css'
import SweetItemCard from '../../Components/SweetItemCard/SweetItemCard'
import magnifyingGlass from '../../Assets/SiteImages/search.png'
import notFound from '../../Assets/SiteImages/notFound.png'
import {StoreContext} from '../../Context/StoreContext'

function Search() {

const [searchInput, setSearchInput] = useState('');
const [searchString, setSearchString] = useState('');
const { sweetList } = useContext(StoreContext)

const searchResult = sweetList.filter(
    (sw) => {return( (sw.name.toLowerCase()).includes(searchString.toLowerCase()) )}
)

useEffect(
    () => { !searchInput ? setSearchString('') : '' },
    [searchInput]
);

return (
<div className='search'>

<center>
<div className="search-bar-container">
    <input 
    type='text' 
    className='search-bar' 
    placeholder='Search for tasty sweets here...'
    onChange={(e) => setSearchInput(e.target.value)}/>

    <FiSearch 
    size={30} 
    className='search-icon'
    onClick={() => setSearchString(searchInput)} />
</div>
</center>

{
!searchString
? 
<center>
<h2 className='search-title'>What are you looking for ?</h2>
<img src={magnifyingGlass} alt="search" className='search-image'/>
</center>
: 
(!searchResult.length
?
<center  className='not-found'>
    <h2 className='search-title'>No such items found!</h2>
    <img src={notFound} alt="Not Found" />
</center>
:
<div className='search-display'>
    {searchResult.map(
    (sweet,index) => {
         return(
             <SweetItemCard 
                 key={index}
                 id={sweet._id} 
                 name={sweet.name}
                 image={sweet.image}
                 price={sweet.price}
                 description={sweet.description}
                 ingredients={sweet.ingredients} 
                 available={sweet.available}/>
         )
     }
    )}
</div>
)}

</div>
)}

export default Search
