import React from 'react';
import img from '../../content/top5.png'
import './Logo.css'

const logo = () => {
return (
    <div>
        <img src={img} alt = 'logo' className='logo'/>
    </div>
)
}

export default logo