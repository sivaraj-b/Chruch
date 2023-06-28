import React from 'react'
import './mainform.css'
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags'
import 'react-phone-number-input/style.css';
function MainForm() {
  return (
    <form className='form'>
      <div>
         <div>
             <label htmlFor='male'>Male</label>
             <input id='male' type="radio" name="gender" value="male"  />
         </div>
         <div>
             <label htmlFor='female'>Female</label>
             <input id='female' type="radio" name="gender" value="female"  />
         </div>
         <div>
              <label htmlFor='isMarried'>MarriageStatus</label>
              <input id='isMarried' type="checkbox" name="isMarried" value="female"  />
         </div>
      </div>
      <div>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id='name' name='name' placeholder='name' />
          </div>
          <div>
              <label htmlFor="spouse">spouse</label>
              <input type="text" id='spouse' name='spouse' placeholder='spouse' />
          </div>
      </div>
      <div>
        <div>
          <label htmlFor="phoneNo">Phone No</label>
          <PhoneInput name="phoneNo" defaultCountry="IN"  flags={flags}    placeholder="Enter phone number"/>
        </div>
        <div>
            <label htmlFor="dob" >Dob:</label>
            <input id="dob" name="dob" type="date" />
        </div>
      </div>
      <div>
        <div>
            <label htmlFor="wedding" >WeddingDay:</label>
            <input id="wedding" name="wedding" type="date" />
        </div>
        <div>
           {/* Image */}
        </div>
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          rows="5"
          cols="50"
          placeholder="Enter your address"
         name='address'
        />
      </div>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default MainForm