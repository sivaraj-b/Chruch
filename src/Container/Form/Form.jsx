import React from 'react'
import './form.css'
import Formbg from '../../assets/Formbg.jpg'
import { MainForm } from '../../Components'
function Form() {
  return (
    <div className='parent__form'>
        <div className='parent__form-bg'>
            <img src="https://images.pexels.com/photos/974069/pexels-photo-974069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        </div>
        <div className=''>
            <MainForm name='Family Detail'/>
        </div>
    </div>
  )
}

export default Form