import React, { useState } from 'react'
import "./admin.css"
import BackGround from '../../assets/Admin.jpg'
import { FaUserLock } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
function Admin() {
  const [name ,setName ] =useState('')
  const [password,setPassword] = useState('')
  const [passwordErr , setPasswordErr] = useState(false);
  const [nameErr , setNameErr] = useState(false);


  const handleClick =(e)=>{
    e.preventDefault();
    if(!(name.trim()) || name.trim() !== 'admin'){
      setNameErr(true)
      setTimeout(()=>{
        setNameErr(false)
      },3000)
    }
    if(!(password.trim()) || password.trim() !== 'admin'){
      setPasswordErr(true)
      setTimeout(()=>{
        setPasswordErr(false)
      },3000)
    }

    if(name.trim() === 'admin' && password.trim() === 'admin'){
      alert("Super")
    }

  }



  return (
    <div className='admin'>
        <div className='admin-img'>
            <img src={BackGround} alt="" />
        </div>
        <div className='admin__form'>
            <div className='admin__form-firstChild'>
                <h1>Admin Login</h1>
            </div>
            <div className='admin__form__content'>
                <div className='admin__form__content-align'>
                    <div style={{height:"60px"}}>
                    <div className='admin__form__content-name'>
                        <FaUserLock/>
                        <input type="text" placeholder='Name' name='name' value={name} onChange={(e)=>{
                          setName(e.target.value)
                          setNameErr(false)
                        }} />
                    </div>
                      {nameErr&&<p>Please Enter Valid Name </p>}
                    </div>
                    <div style={{height:"60px"}}>
                    <div className='admin__form__content-name'>
                        <RiLockPasswordFill/>
                        <input type="password" placeholder='Password' name='password' value={password} onChange={(e)=>{
                          setPassword(e.target.value)
                          setPasswordErr(false)
                        } }/>
                    </div>
                    {passwordErr&&<p>Please Enter Valid Password </p>}
                    </div>
                    <button onClick={handleClick} className='btn'>Done</button>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Admin