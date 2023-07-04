import React from 'react'
import Formbg from '../../assets/Child.jpg'
import { MainForm } from '../../Components'
function Child() {
  return (
    <div className='parent__form'>
        <div className='parent__form-bg'>
            <img src="https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        </div>
        <div >
            <MainForm name='Child Detail' />
        </div>
    </div>
  )
}

export default Child