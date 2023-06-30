import React from 'react'
import Formbg from '../../assets/Child.jpg'
import { MainForm } from '../../Components'
function Child() {
  return (
    <div className='parent__form'>
        <div className='parent__form-bg'>
            <img src={Formbg} alt="" />
        </div>
        <div >
            <MainForm name='Child Detail'/>
        </div>
    </div>
  )
}

export default Child