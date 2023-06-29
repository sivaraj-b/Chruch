import React from 'react'
import './mainform.css'
import FormName from '../FormName/FormName'
import {AiOutlineCloudUpload} from 'react-icons/ai'



function MainForm() {
  return (
    <form className='form'>
        <FormName name='Family Detail'/>
      <div className='form-validate'>
         <div>
             <input id='male' type="radio" name="gender" value="male"  />
             <label htmlFor='male'>Male</label>
         </div>
         <div>
             <input id='female' type="radio" name="gender" value="female"  />
             <label htmlFor='female'>Female</label>
         </div>
         <div>
              <input id='isMarried' type="checkbox" name="isMarried" value="female"  />
              <label htmlFor='isMarried'>MarriageStatus</label>
         </div>
         <div>
              <input id='isMarried' type="checkbox" name="isMarried" value="female"  />
              <label htmlFor='isMarried'>MarriageStatus</label>
         </div>
      </div>
      <div className='form-detail'>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id='name' name='name' placeholder='name' />
          
          </div>
          <div>
              <label htmlFor="spouse">spouse:</label>
              <input type="text" id='spouse' name='spouse' placeholder='spouse' />
          </div>
      </div>
      <div className='form-detail'>
        <div>
          <label htmlFor="phoneNo">PhoneNo:</label>
          <input name="phoneNo" defaultCountry="IN"     placeholder="Enter phone number"/>
        </div>
        <div>
            <label htmlFor="dob" >Dob:</label>
            <input id="dob" name="dob" type="date" />
        </div>
      </div>
      <div className='form-detail'>
        <div>
            <label htmlFor="wedding" >WeddingDay:</label>
            <input id="wedding" name="wedding" type="date" />
        </div>
       
      </div>
      <div className='form-detail-address'>
        <div className='form__address'>
               <label htmlFor="address">Address:</label>
              <textarea
                id="address"
                rows="5"
                cols="50"
                placeholder="Enter your address"
              name='address'
              />
        </div>
        <div>
          <div className='form__child-align'>  
           <h4>Child:</h4>
            <div className='form__child-align'>
                 <button type='button' className='add'>+</button>
                    <p>0</p>
                 <button type='button' className='sub'>-</button>
            </div>
          </div>
          <div>
              {/* Child */}
          </div>
        </div>
      </div>
      <div className='form-img'>
        <label htmlFor="file" >Upload <AiOutlineCloudUpload/></label>
        <input type="file" id='file' name='bastic' />
        </div>
      <div className='btn-submit'>
      <button type='submit'>Submit</button>
      </div>
    </form>
  )
}

export default MainForm