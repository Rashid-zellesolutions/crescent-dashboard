import React from 'react'
import "./module.header.css";
import { PiHandsClappingLight } from "react-icons/pi";

const Header = () => {
  return ( 
    <div className='header'>
        <div className='page-name'>
            <p className='page-heading'>Dashboard</p>
        </div>
        <div className='greeting'>
            <span className='greet'>
                <span> <PiHandsClappingLight size={20} /> </span>
                Good Afternoon
            </span>
            <span className='web-name'>Eden Garden</span>
        </div>
    </div>
  )
}

export default Header