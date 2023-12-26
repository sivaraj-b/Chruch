import React, { useRef, useState } from 'react'
import './navbar.css'
import {BsSearch} from 'react-icons/bs'
import Profile from '../../assets/Profile.jpg'

function Navbar() {
const [inputStyle,setInputStyle] = useState(false)
const inputRef = useRef(null);
console.log(inputStyle)
  return (
    <div className='navbar'>
        <div className='navbar__name'>
            <div className='navbar__name-img'>
                <img src={Profile} alt='profile-pic'/>
            </div>
            <h2>CHURCH NAME</h2>
        </div>
        <div className='navbar__content'> 
            <div className={inputStyle?'navbar__input-click':'navbar__input'} onClick={()=>{
                setInputStyle(!inputStyle)
                if (inputRef.current) {
                    console.log(inputRef.current.disabled)
                    inputRef.current.disabled = false; // Enable the input field
                    inputRef.current.focus(); // Focus on the input field
                    console.log(inputRef.current.disabled)
                  }
            }}>
                <BsSearch className={inputStyle?'navbar__content-icon-click':'navbar__content-icon'}/>
                <input type='text' placeholder='Search Name' ref={inputRef} disabled={!inputStyle} />
            </div>
            <button type='button'>Create User</button>
        </div>
        
    </div>
  )
}

export default Navbar