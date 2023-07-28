import React from 'react'
import './form.css'
import Formbg from '../../assets/Formbg.jpg'
import { MainForm } from '../../Components'
function Form() {
  return (
    <div className='parent__form'>
        <div className='parent__form-bg'>
            <img src={Formbg} alt="" />
        </div>
        <div className=''>
            <MainForm name='Family Detail'/>
        </div>
    </div>
  )
}

export default Form