import React from 'react'
import './formName.css'
import logo from '../../assets/logo.png'
function FormName({name}) {
  return (
    <div className='form-logo'>
            <div className='form-logo-img'>
               <img src={logo} alt="" />
            </div>
            <h1>{name}</h1>
        </div>
  )
}

export default FormName