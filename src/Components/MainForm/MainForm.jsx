import React,{useEffect, useState} from 'react'
import './mainform.css'
import { v4 as uuidv4 } from 'uuid';
import FormName from '../FormName/FormName'
import {AiOutlineCloudUpload} from 'react-icons/ai'
import { useLocation, useMatch, useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from '../../Context/Context';


function MainForm({name}) {
  const [once,setOnce] = useState(true);
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
  if(!parent){
    let foundDetail  = tempData.find((item)=>item.id === parentId)
        
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
 
 //checking parent is there or not 
if(parent){

    console.log("INNNNNNNNNNN")
      
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
                      parent = addChild.id
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
  console.log("IN")
    // if we don't get parent id it will happen because its starting part so that only no parent id
    if(family.name.trim() && family.spouse.trim()){ //checking name and spouse
      // its true add to temData
      let addFamily = {...family,id:uuidv4()}
      let details = [addFamily,...tempData,]
      console.log(details)
      dispatch({type:"ADD__TEMP__DATA__STATE",details,parent:addFamily.id })
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
 

        if(parentId){

          const removeChildFromNestedArray = (arr, childId) => {
            return arr.map((obj) => {
              if (obj.id === childId) {
                // Remove the child element
                
                let remove = obj.child.pop()
                console.log(remove)
                return { ...obj,child: remove };
              } else if (Array.isArray(obj.child)) {
                // Recursively remove the child from the nested array
                return {
                  ...obj,
                  child: removeChildFromNestedArray(obj.child, childId),
                };
              }
              return obj;
            });
          };
          console.log(parentId)
           let RemoveChild =removeChildFromNestedArray(tempData,parentId)
            dispatch({type:"REMOVE__CHILD",RemoveChild})
        }




}











//It will Control Submit button

const handleClick=(e)=>{
  


  e.preventDefault();
    if(parent){


          if(family.isMarried){

              if(family.name && family.spouse && family.dob && family.phoneNo && family.address && family.weddingDay){
                 

                const findElement = (arr, id) => {
                  let foundElement = null;
              
                  arr.find(obj => {
                    if (obj.id === id) {
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
                
                let addChildEle=null
                let addInChildArr = null
                    if(once){
                     addChildEle={...family,id:uuidv4()}
                     const updateNestedArray = (arr, targetId) => {
                      return arr.map(obj => {
                        if (obj.id === targetId) {
                          return {...obj ,child:[...obj.child,addChildEle]}
                        } else if (Array.isArray(obj.child)) {
                          return {
                            ...obj,
                            child: updateNestedArray(obj.child ,targetId)
                          };
                        }
                        return obj;
                      });
                    };
                    addInChildArr = updateNestedArray(tempData,parent)
                     setOnce(false)
                    }else{
                      const updateNestedArray = (arr, targetId) => {
                        return arr.map(obj => {
                          if (obj.id === targetId) {
                            return {...obj ,child:obj.child.map((list)=>{
                                      if(list.id === parentId){
                                          return {...list,...family}
                                      }else{
                                       return list
                                      }
                            })}
                          } else if (Array.isArray(obj.child)) {
                            return {
                              ...obj,
                              child: updateNestedArray(obj.child ,targetId)
                            };
                          }
                          return obj;
                        });
                      };
                      addInChildArr = updateNestedArray(tempData,parent)
                    }
               
                 
                console.log(addInChildArr)
               
                dispatch({type:"UPDATE__SUBMIT__ADD__CHILD",parent,addInChildArr})
                const targetElement = findElement(  addInChildArr, parent);
                console.log(targetElement)
                setFamily({...family,
                  id:targetElement.id,
                  name:targetElement.name,
                  spouse:targetElement.spouse,
                  address:targetElement.address,
                  phoneNo:targetElement.phoneNo,
                  dob:targetElement.dob,
                  weddingDay:targetElement.weddingDay,
                  gender:targetElement.gender,
                  isBaptism:targetElement.isBaptism,
                  baptism:targetElement.baptism,
                  isMarried:targetElement.isMarried,
                  child:targetElement.child,

                })
                navigate(-1)

              }else{
                //Check ERROR
              }

          }else{
              

            if(family.name && family.dob && family.phoneNo && family.address){
                 

              const findElement = (arr, id) => {
                let foundElement = null;
            
                arr.find(obj => {
                  if (obj.id === id) {
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
              
              let addChildEle=null
              let addInChildArr = null
                  if(once){
                   addChildEle={...family,id:uuidv4()}
                   const updateNestedArray = (arr, targetId) => {
                    return arr.map(obj => {
                      if (obj.id === targetId) {
                        return {...obj ,child:[...obj.child,addChildEle]}
                      } else if (Array.isArray(obj.child)) {
                        return {
                          ...obj,
                          child: updateNestedArray(obj.child ,targetId)
                        };
                      }
                      return obj;
                    });
                  };
                  addInChildArr = updateNestedArray(tempData,parent)
                   setOnce(false)
                  }else{
                    const updateNestedArray = (arr, targetId) => {
                      return arr.map(obj => {
                        if (obj.id === targetId) {
                          return {...obj ,child:obj.child.map((list)=>{
                                    if(list.id === parentId){
                                        return {...list,...family}
                                    }else{
                                     return list
                                    }
                          })}
                        } else if (Array.isArray(obj.child)) {
                          return {
                            ...obj,
                            child: updateNestedArray(obj.child ,targetId)
                          };
                        }
                        return obj;
                      });
                    };
                    addInChildArr = updateNestedArray(tempData,parent)
                  }
             
               
              console.log(addInChildArr)
             
              dispatch({type:"UPDATE__SUBMIT__ADD__CHILD",parent,addInChildArr})
              const targetElement = findElement(  addInChildArr, parent);
              console.log(targetElement)
              setFamily({...family,
                id:targetElement.id,
                name:targetElement.name,
                spouse:targetElement.spouse,
                address:targetElement.address,
                phoneNo:targetElement.phoneNo,
                dob:targetElement.dob,
                weddingDay:targetElement.weddingDay,
                gender:targetElement.gender,
                isBaptism:targetElement.isBaptism,
                baptism:targetElement.baptism,
                isMarried:targetElement.isMarried,
                child:targetElement.child,

              })
              navigate(-1)

            }else{
              //Check ERROR
            }



          }








    }else{
          
          if(!parentId){

              if(family.isMarried){
                    if(family.name && family.spouse && family.dob && family.phoneNo && family.address && family.weddingDay){
                        let addWithoutChild = {...family,id:uuidv4()}
                        dispatch({type:"ADD__IN__STATE__FIRST",addWithoutChild})
                        setFamily({
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

                if(family.name&&family.phoneNo&&family.address&&family.dob){
                  let addWithoutChild = {...family,id:uuidv4()}
                  dispatch({type:"ADD__IN__STATE__FIRST",addWithoutChild})
                  setFamily({
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

          }else{

              if(family.isMarried){
                  if(family.name && family.spouse && family.dob && family.phoneNo && family.address && family.weddingDay){
                              let UpdateArrInFinal = tempData.map((item)=>{
                                      if(item.id === parentId){
                                          return {...item,
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
                                      }else{
                                          return item
                                      }
                              })

                              dispatch({type:"ADD__FINALLY__IN__NESTED",UpdateArrInFinal})
                              setFamily({
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
                  if(family.name&&family.phoneNo&&family.address&&family.dob){
                    let UpdateArrInFinal = tempData.map((item)=>{
                      if(item.id === parentId){
                          return {...item, name:family.name,
                          
                            address:family.address,
                            phoneNo:family.phoneNo,
                            dob:family.dob,
                            gender:family.gender,
                            isBaptism:family.isBaptism,
                            baptism:family.baptism,
                            isMarried:family.isMarried,
                           spouse:"",
                           weddingDay:"",
                           child:[]}
                      }else{
                          return item
                      }
              })
              dispatch({type:"ADD__FINALLY__IN__NESTED",UpdateArrInFinal})
              setFamily({
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
                  }else{
                    //SET ERROR
                  }
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