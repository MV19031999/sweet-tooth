import React from 'react'
import { useState } from 'react'

import './Home.css'
import Header from '../../Components/Header/Header'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import SweetDisplay from '../../Components/SweetDisplay/SweetDisplay'
import Gift from '../../Components/Gift/Gift'

function Home() {
const [category, setCategory] = useState('All');

return (
<div>
<Header />

<ExploreMenu category={category} setCategory={setCategory} />

<SweetDisplay category={category} />

<Gift />

</div>
)}

export default Home

