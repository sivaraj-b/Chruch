import React,{useState} from 'react'
import './mainform.css'
import FormName from '../FormName/FormName'
import {AiOutlineCloudUpload} from 'react-icons/ai'
import { useParams } from "react-router-dom";


function MainForm() {
  const [family,setFamily] =useState({
      name:"",
      spouse:"",
      address:"",
      phoneNo:"",
      dob:"",
      weddingDay:"",
      gender:"male",
      isBaptism:false,
      Baptism:"",
      isMarried:false,
  })
 
const {child,parent}=useParams()
console.log(child)

const changeHandler =(e)=>{

  const name = e.target.name;
  const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
  console.log({...family,[name]:value})
  setFamily({...family,[name]:value})

}



  return (
    <form className='form'>
        <FormName name='Family Detail'/>
      <div className='form-validate'>
         <div>
             <input id='male' type="radio" name="gender" value="male" checked={family.gender === 'male'}  onChange={changeHandler}/>
             <label htmlFor='male'>Male</label>
         </div>
         <div>
             <input id='female' type="radio" name="gender" value="female" checked={family.gender === 'female'}  onChange={changeHandler} />
             <label htmlFor='female'>Female</label>
         </div>
         <div>
              <input id='isMarried' type="checkbox" name="isMarried" checked={family.isMarried} onChange={changeHandler}/>
              <label htmlFor='isMarried'>MarriageStatus</label>
         </div>
         <div>
              <input id='isBaptism' type="checkbox" name="isBaptism" checked={family.isBaptism} onChange={changeHandler} />
              <label htmlFor='isBaptism'>Baptism</label>
         </div>
      </div>
      <div className='form-detail'>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id='name' name='name' placeholder='name' value={family.name} onChange={changeHandler} />
          </div>
        {family.isMarried&&(
               <div>
               <label htmlFor="dob" >Dob:</label>
               <input id="dob" name="dob" type="date" value={family.dob} onChange={changeHandler} />
           </div>
        )}
            
      </div>
          {!family.isMarried&&(
                 <div className='form-detail'>
                    <div>
                        <label htmlFor="dob" >Dob:</label>
                        <input id="dob" name="dob" type="date" value={family.dob} onChange={changeHandler} />
                    </div>
               </div>
          )}
      <div className='form-detail'>
        <div>
          <label htmlFor="phoneNo">PhoneNo:</label>
          <input name="phoneNo"  placeholder="Enter phone number" value={family.phoneNo} onChange={changeHandler}/>
        </div>
        {family.isMarried&&(
              <div>
                  <label htmlFor="spouse">{family.gender==='male'?'Husband:':"Wife:"}</label>
                  <input type="text" id='spouse' name='spouse' placeholder={family.gender==='male'?'Enter husband name:':"Enter wife name"} value={family.spouse} onChange={changeHandler}/>
              </div>
            )}
      </div>
        {family.isMarried&&(
              <div className='form-detail'>
              <div>
                  <label htmlFor="weddingDay" >WeddingDay:</label>
                  <input id="weddingDay" name="weddingDay" type="date" value={family.weddingDay} onChange={changeHandler}/>
              </div>
              {family.isMarried&&(
                     <div>
          <div className='form__child-align'>  
           <h4>Child:</h4>
            <div  className='form__child-align'>
                 <button type='button' className='add'>+</button>
                    <p>0</p>
                 <button type='button' className='sub'>-</button>
            </div>
          </div>
          
        </div>
            )}
            </div>
        )}
      <div className='form-detail-address'>
        <div className='form__address'>
               <label htmlFor="address">Address:</label>
              <textarea
                id="address"
                rows="5"
                cols="50"
                placeholder="Enter your address"
              name='address'
              value={family.address}
              onChange={changeHandler}
              />
        </div>
            
            <div>
              {/* Child */}
          </div>
      </div>
        {family.isBaptism&&(
            <div className='form-img'>
            <label htmlFor="file" >Baptism Certificate <AiOutlineCloudUpload/></label>
            <input type="file" id='file' name='bastic' />
            </div>
        )}
      <div className='btn-submit'>
      <button type='submit'>Submit</button>
      </div>
    </form>
  )
}

export default MainForm