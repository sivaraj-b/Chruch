import React,{useEffect, useState} from 'react'
import './mainform.css'
import { v4 as uuidv4 } from 'uuid';
import FormName from '../FormName/FormName'
import {AiOutlineCloudUpload} from 'react-icons/ai'
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from '../../Context/Context';


function MainForm({name}) {
  const [count,setCount] = useState(0);
  const [family,setFamily] =useState({
      id:"",
      name:"",
      spouse:"",
      address:"",
      phoneNo:"",
      dob:"",
      weddingDay:"",
      gender:"male",
      isBaptism:false,
      baptism:"",
      isMarried:false,
      child:[],
  })

  const [err,setErr] = useState({
    name:false,
    spouse:false,
    address:false,
    phoneNo:false,
    dob:false,
    weddingDay:false,
    gender:false,
    isBaptism:false,
    baptism:false,
    isMarried:false,
   
  })

//temp data
const {tempData,dispatch,parentId} =useGlobalContext()










    // navigate to Another Page
  const navigate =useNavigate()
 //take id from url
let {parent}=useParams()

useEffect(()=>{
  if(parent){
    dispatch({type:"TRACK__PARENT__ID",parent})

  }else{
    let foundDetail  = tempData.find((item)=>item.id === parentId)
        
    if(foundDetail){
      setFamily({...family,
        name:foundDetail.name,
        spouse:foundDetail.spouse,
        gender:foundDetail.gender,
        phoneNo:foundDetail.phoneNo,
        weddingDay:foundDetail.weddingDay,
        address:foundDetail.address,
        child:foundDetail.child,
        dob:foundDetail.dob,
        isMarried:foundDetail.isMarried,
        isBaptism:foundDetail.isBaptism,
        baptism:foundDetail.baptism,
      
      
      })
  } 
  }
},[parent])

//onChange Function
const changeHandler =(e)=>{
  
  const name = e.target.name;
  const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
  setFamily({...family,[name]:value})
  if(family.name.trim()){
      setErr(prev=>({...prev,name:false}))
  }
  if(family.spouse.trim()){
    setErr(prev=>({...prev,spouse:false}))
}
}













// Add Child Function 
const addChild =(e)=>{
  e.preventDefault();
  setCount((pre)=>pre+1)
 //checking parent is there or not 
if(parent){

    
      
  if(family.name.trim() && family.spouse.trim()){ //checking name and spouse
    // its true add to temData
    let addChild = {...family,id:uuidv4()}
    //checking parent in tempState
    const searchState = tempData.some((item)=> parent === item.id )
            //the parent id present in tempState
        if(searchState){
           
            const addChildInStateEle = tempData.map((item)=>{
                    if(item.id === parent){
                        return{...item,child:[...item.child,addChild]}
                    }else{
                      return item
                    }

            })
              //update TempData and parentId 
            dispatch({type:'ADD__CHILD__IN__STATE__ELE',parent,addChildInStateEle})
            setFamily({...family,
              id:"",
              name:"",
              spouse:"",
              address:"",
              phoneNo:"",
              dob:"",
              weddingDay:"",
              gender:"male",
              isBaptism:false,
              baptism:"",
              isMarried:false,
              child:[],
            
            })
            navigate(`/child/${addChild.id}`)

        }else{
               

                const updateNestedArray = (arr, targetId, newId) => {
                  return arr.map(obj => {
                    if (obj.id === targetId) {
                      return {...obj ,child:[...obj.child,addChild]}
                    } else if (Array.isArray(obj.child)) {
                      return {
                        ...obj,
                        child: updateNestedArray(obj.child ,targetId, newId)
                      };
                    }
                    return obj;
                  });
                };
                  let addInChildArr = updateNestedArray(tempData,parent,addChild.id)
                 
                 dispatch({type:'ADD__CHILD__IN__CHILD__ELE',parent,addInChildArr})
                 setFamily({...family,
                  id:"",
                  name:"",
                  spouse:"",
                  address:"",
                  phoneNo:"",
                  dob:"",
                  weddingDay:"",
                  gender:"male",
                  isBaptism:false,
                  baptism:"",
                  isMarried:false,
                  child:[],
                
                })
                navigate(`/child/${addChild.id}`)

        }
     

  }else{
    //if false check the name and spouse what is false
    if(!family.name.trim()){
      setErr(prevState => ({ ...prevState, name: true }));
        
      }
      if(!family.spouse.trim()){
        setErr(prevState => ({ ...prevState, spouse: true }));
      }
  }






  
}else{
    // if we don't get parent id it will happen because its starting part so that only no parent id
    if(family.name.trim() && family.spouse.trim()){ //checking name and spouse
      // its true add to temData
      let addFamily = {...family,id:uuidv4()}
      let details = [addFamily,...tempData,]
      dispatch({type:"ADD__TEMP__DATA__STATE",details })
      navigate(`/child/${addFamily.id}`)
    }else{
      //if false check the name and spouse what is false
      if(!family.name.trim()){
        setErr(prevState => ({ ...prevState, name: true }));
          
        }
        if(!family.spouse.trim()){
          setErr(prevState => ({ ...prevState, spouse: true }));
        }
    }

  // navigate(`/child/${details.id}`);



}

}
//Remove Child Function
const removeChild=()=>{
  navigate(-1)
}











//It will Control Submit button
const handleClick=(e)=>{

  e.preventDefault();
  if(parent){

    if(family.isMarried){

      if(family.name.trim()&&family.dob.trim()&&family.phoneNo.trim()&&family.address.trim()&&family.spouse.trim()&&family.weddingDay){
          
        let addChild = {
          name:family.name,
          spouse:family.spouse,
          address:family.address,
          phoneNo:family.phoneNo,
          dob:family.dob,
          weddingDay:family.weddingDay,
          gender:family.gender,
          isBaptism:family.isBaptism,
          baptism:family.baptism,
          isMarried:family.isMarried,
          child:family.child,
        }

        const updateNestedArray = (arr, targetId, newId) => {
          return arr.map(obj => {
            if (obj.id === targetId) {
              return {...obj ,child:[...obj.child,addChild]}
            } else if (Array.isArray(obj.child)) {
              return {
                ...obj,
                child: updateNestedArray(obj.child ,targetId, newId)
              };
            }
            return obj;
          });
        };
          let addInChildInNestedArr = updateNestedArray(tempData,parent,addChild.id)
          console.log(addInChildInNestedArr)
        const addInChildArr =[...addInChildInNestedArr,addChild]
     dispatch({type:'ADD__CHILD__IN__CHILD__ELE',parent,addInChildArr})
     const findElement = (arr, id) => {
      let foundElement = null;
  
      arr.find(obj => {
        if (id === obj.id) {
          foundElement = obj;
          return true;
        } else if (Array.isArray(obj.child)) {
          const foundChild = findElement(obj.child, parent);
          if (foundChild) {
            foundElement = foundChild;
            return true;
          }
        }
        return false;
      });
  
      return foundElement;
    };
    let foundDetail = findElement(tempData,parent)
    if(foundDetail){
      console.log(foundDetail)
        setFamily({...family,
          name:foundDetail.name,
          spouse:foundDetail.spouse,
          gender:foundDetail.gender,
          phoneNo:foundDetail.phoneNo,
          weddingDay:foundDetail.weddingDay,
          address:foundDetail.address,
          child:foundDetail.child,
          dob:foundDetail.dob,
          isMarried:foundDetail.isMarried,
          isBaptism:foundDetail.isBaptism,
          baptism:foundDetail.baptism,
        
        
        })
        setCount((pre)=>pre-1)
        navigate(-1)
    }  
     



    }



    }else{

      if(family.name.trim()&&family.dob.trim()&&family.phoneNo.trim()&&family.address.trim()){
          
          let addChild = {
                name:family.name,
          spouse:family.spouse,
          address:family.address,
          phoneNo:family.phoneNo,
          dob:family.dob,
          weddingDay:family.weddingDay,
          gender:family.gender,
          isBaptism:family.isBaptism,
          baptism:family.baptism,
          isMarried:family.isMarried,
          child:family.child,
          }

          const updateNestedArray = (arr, targetId, newId) => {
            return arr.map(obj => {
              if (obj.id === targetId) {
                return {...obj ,child:[...obj.child,addChild]}
              } else if (Array.isArray(obj.child)) {
                return {
                  ...obj,
                  child: updateNestedArray(obj.child ,targetId, newId)
                };
              }
              return obj;
            });
          };
            let addInChildInNestedArr = updateNestedArray(tempData,parent,addChild.id)
            console.log(addInChildInNestedArr)
          const addInChildArr =[...addInChildInNestedArr,addChild]
       dispatch({type:'ADD__CHILD__IN__CHILD__ELE',parent,addInChildArr})
       const findElement = (arr, id) => {
        let foundElement = null;
    
        arr.find(obj => {
          if (id === obj.id) {
            foundElement = obj;
            return true;
          } else if (Array.isArray(obj.child)) {
            const foundChild = findElement(obj.child, parent);
            if (foundChild) {
              foundElement = foundChild;
              return true;
            }
          }
          return false;
        });
    
        return foundElement;
      };
      let foundDetail = findElement(tempData,parent)
   
      if(foundDetail && parent){
        console.log(foundDetail)
          setFamily({...family,
            name:foundDetail.name,
            spouse:foundDetail.spouse,
            gender:foundDetail.gender,
            phoneNo:foundDetail.phoneNo,
            weddingDay:foundDetail.weddingDay,
            address:foundDetail.address,
            child:foundDetail.child,
            dob:foundDetail.dob,
            isMarried:foundDetail.isMarried,
            isBaptism:foundDetail.isBaptism,
            baptism:foundDetail.baptism,
          
          
          })
          setCount(prv=>prv-1)
          navigate(-1)
      }  
       



      }


    }



  }else{
          // HERE ONLY STOP YESTERDAY
    if(family.isMarried){
      if(family.name&&family.dob&&family.phoneNo&&family.spouse&&family.weddingDay&&family.address){
              let AddMainData=[]
              if(parentId){
                AddMainData= tempData.map((item)=>{
                  if(item.id=== parentId){
                      return {...item,name:family.name,dob:family.dob,phoneNo:family.phoneNo,spouse:family.spouse,weddingDay:family.weddingDay,child:family.child,address:family.address}
                  }else{
                    return item
                  }
            })
              }else{
                AddMainData=[...tempData,{name:family.name,dob:family.dob,phoneNo:family.phoneNo,spouse:family.spouse,weddingDay:family.weddingDay,child:family.child,address:family.address}]
              }
          console.log("IN")
          dispatch({type:"ADD__MAIN__ELE",AddMainData})
          setFamily({...family,
            id:"",
            name:"",
            spouse:"",
            address:"",
            phoneNo:"",
            dob:"",
            weddingDay:"",
            gender:"male",
            isBaptism:false,
            baptism:"",
            isMarried:false,
            child:[],
          
          })
          navigate('/dashboard')
      }
    }else{
      if(family.name&&family.dob&&family.phoneNo&&family.address&&family.gender){
        const AddMainData = [...tempData,{id:uuidv4(),name:family.name, address:family.address, gender:family.gender,isBaptism:family.isBaptism,isMarried:family.isMarried,baptism:family.baptism,spouse:family.spouse,phoneNo:family.phoneNo,dob:family.dob,child:family.child,weddingDay:family.weddingDay}]
        console.log("IN IN")
    dispatch({type:"ADD__MAIN__ELE",AddMainData})
    setFamily({...family,
      id:"",
      name:"",
      spouse:"",
      address:"",
      phoneNo:"",
      dob:"",
      weddingDay:"",
      gender:"male",
      isBaptism:false,
      baptism:"",
      isMarried:false,
      child:[],
      
    })

        navigate('/dashboard')

      }
    }

    



  }





}



  return (
    <form className='form'>
        <FormName name={name}/>
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
              <label htmlFor='isMarried'>Married</label>
         </div>
         <div>
              <input id='isBaptism' type="checkbox" name="isBaptism" checked={family.isBaptism} onChange={changeHandler} />
              <label htmlFor='isBaptism'>Baptism</label>
         </div>
      </div>
      <div className='form-detail'>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id='name' name='name' className={`${err.name?'placeholder-color':""}`} placeholder={err.name?' Please fill name':'Enter your name'} value={family.name} onChange={changeHandler} />
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
                  <label htmlFor="spouse">{family.gender==='male'?'Wife:':"Husband:"}</label>
                  <input type="text" id='spouse' name='spouse' className={`${err.spouse?'placeholder-color':""}`} placeholder={err.spouse?"Please enter the name":family.gender==='male'?'Enter husband name:':"Enter wife name"} value={family.spouse} onChange={changeHandler}/>
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
                 <button onClick={addChild} type='button' className='add'>+</button>
                    <p>{family.child.length}</p>
                 <button onClick={removeChild} type='button' className='sub'>-</button>
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
            <input type="file" id='file' name=' baptism' />
            </div>
        )}
      <div className='btn-submit'>
      <button onClick={handleClick} type='submit'>Submit</button>
      </div>
    </form>
  )
}

export default MainForm