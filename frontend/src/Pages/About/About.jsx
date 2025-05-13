import React, { useEffect } from 'react'


import './About.css'
import cupCake from '../../Assets/SiteImages/aboutCupCake.png'
import macaroons from '../../Assets/SiteImages/aboutMacaroons.png'
import doughnuts from '../../Assets/SiteImages/aboutDoughnuts.png'
import location from '../../Assets/SiteImages/location.jpg'


function About() {

useEffect(
    () => {window.scroll(0,0)},
    []
)

return (
<div className='about'>

<center>

<h1 className='title'>Sweet-Tooth... An Introduction...</h1>

<img src={doughnuts} alt="About Page Image 1" className='about-title-image'/>

<h3 className='tag-line'>Delight  In  Every  Bite.</h3>

<div className='section'>
    <img src={macaroons} alt="About Page Image 2" />
    <p>
    We, at Sweet-Tooth, have taken up this moto with great enthusiasm. We are not just a bakery - we are a celebration of sweet moments and delicious creations. At Sweet-tooth, we believe that every bite should be an experience, and every treat should bring a smile to your face.
    </p>
</div>

<div className='section'>
    <p>
    Founded with the mission to offer the freshest, most innovative baked goods, we take pride in using only the finest ingredients, sourced locally whenever possible. Our team is dedicated to making your day a little sweeter with the highest quality pastries, all baked fresh daily. Satisfy your sweet tooth with Sweet-Tooth!!
    </p>
    <img src={cupCake} alt="About Page Image 3" />
</div>

<h3 className='tag-line'>
Indulgence perfected ~
Sweetness Redefined
</h3>

</center>

<div className='address-container'>

<div className='address'>
    <img src={location} alt='location' />
    <p>
        The Sweet-Tooth,
        Honey Dukes Street,
        Hogsmeade Village, 
        Hogwarts,
        Pin - 123456
    </p>
</div>

<div className='address'>
    <img src={location} alt='location' />

    <p>
        The Sweet-Tooth, 
        Zonkos Joke Street,
        Hogsmeade Village, 
        Hogwarts,
        Pin - 987456
    </p>
</div>

</div>

</div>
)}

export default About
