import React,{useEffect, useState} from 'react'
import './mainform.css'
import { v4 as uuidv4 } from 'uuid';
import FormName from '../FormName/FormName'
import {AiOutlineCloudUpload} from 'react-icons/ai'
import {  useNavigate, useParams } from "react-router-dom";
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
      baptism:[],
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
let {parent,childId}=useParams()

useEffect(()=>{
  if(childId){
    
    const findElement  = (arr, id) => {
      let foundElement = null;
      
      arr.map((obj) => {
        if (obj.id === id) {
          foundElement = obj;
        } else if (obj.child && obj.child.length > 0) {
          const foundChild = findElement(obj.child, id);
          if (foundChild) {
            foundElement = foundChild;
          }
        }
      });
  
      return foundElement;
    };

      let foundDetail = findElement(tempData,childId)
        console.log(foundDetail)
    if(foundDetail){
      console.log(foundDetail)
      setFamily({...family,
        id:foundDetail.id,
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

      if(!parent){
          let FountEle = tempData.find((item)=>item.id === parentId)
            console.log(FountEle)
            if(FountEle){

                setFamily({
                  id:FountEle.id,
                  name:FountEle.name,
                  spouse:FountEle.spouse,
                  gender:FountEle.gender,
                  phoneNo:FountEle.phoneNo,
                  weddingDay:FountEle.weddingDay,
                  address:FountEle.address,
                  child:FountEle.child,
                  dob:FountEle.dob,
                  isMarried:FountEle.isMarried,
                  isBaptism:FountEle.isBaptism,
                  baptism:FountEle.baptism,


                })

            }

      }


},[childId])

//onChange Function
const changeHandler =(e)=>{
  
  const name = e.target.name;
  let value;
    if(e.target.value === "checkbox"){
       value = e.target.checked
    }else if(e.target.type === "file"){
    
        value = e.target.files[0];
        const reader = new FileReader();
        console.log(reader.result);
        reader.onload = () => {
          setFamily((prev) =>{ 
              return {...prev, baptism: reader.result.toString()}
          } );
        };
        reader.readAsDataURL(value);

    } else{

      value =  e.target.value;
    };
    setFamily({...family,[name]:value})
    if(family.name.trim()){
        setErr(prev=>({...prev,name:false}))
    }
    if(family.spouse.trim()){
      setErr(prev=>({...prev,spouse:false}))
  }
    }

















// Add Child Function 
const addChild=(e)=>{
  e.preventDefault();

    if(parent){

      const addChildToElement = (arr, id, newChild) => {
        return arr.map((obj) => {
          if (obj.id === id) {
            return { ...obj,...family,id:childId, child: [...obj.child, newChild] };
          } else if (obj.child && obj.child.length > 0) {
            return { ...obj, child: addChildToElement(obj.child, id, newChild) };
          }
          return obj;
        });
      };
          let AddChild = {id:uuidv4(),
           
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
          
          }
          let ArrData = addChildToElement(tempData,childId,AddChild)
          dispatch({type:"ADD__CHILD__IN__STATE__ELE",parent:parent,ArrData})
          navigate(`/child/${childId}/${AddChild.id}`)
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


    }else{

      if(!parentId){
               
        if(family.spouse && family.name){

        
          
         
         let   AddUser = {...family,id:uuidv4()}
         let   addChildId = {
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
         child:[],id:uuidv4()}
        let Merge = {...AddUser,child:[...family.child,addChildId]}
            let ArrData = [...tempData,Merge]
            console.log(ArrData)
             dispatch({type:"ADD__CHILD__IN__STATE__ELE",parent:AddUser.id,ArrData})
             navigate(`/child/${AddUser.id}/${addChildId.id}`)
         }
      }else{

        let   addChildId = {
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
          child:[],id:uuidv4()}

          const addChildToElement = (arr, id, newChild) => {
            return arr.map((obj) => {
              if (obj.id === id) {
                return { ...obj, child: [...obj.child, newChild] };
              } else if (obj.child && obj.child.length > 0) {
                return { ...obj, child: addChildToElement(obj.child, id, newChild) };
              }
              return obj;
            });
          };
          let ArrData = addChildToElement(tempData,parentId,addChildId)
          dispatch({type:"ADD__CHILD__IN__STATE__ELE",parent:parentId,ArrData})
          navigate(`/child/${parentId}/${addChildId.id}`)
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
           
          }




    }







}

console.log(tempData)
//Remove Child Function
const removeChild=()=>{
 

    console.log(tempData)
        if(parentId){

          const removeChildFromNestedArray = (arr, Id) => {
            return arr.map((obj) => {
              if (obj.id === Id) {
                // Remove the child element
                  if(obj.child.length > 0){
                      obj.child.pop()
                  }
                  return { ...obj,child: obj.child};
                   

              } else if (Array.isArray(obj.child)) {
                // Recursively remove the child from the nested array
                return {
                  ...obj,
                  child: removeChildFromNestedArray(obj.child, Id),
                };
              }
              return obj;
            });
          };
          
              if(childId && parentId){
                let   RemoveChild =removeChildFromNestedArray(tempData,childId)
                dispatch({type:"REMOVE__CHILD",RemoveChild})
              }else if(parentId){
                  let  RemoveChild =removeChildFromNestedArray(tempData,parentId)
                dispatch({type:"REMOVE__CHILD",RemoveChild})
                    
              }
          
        }




}









//It will Control Submit button
const handleClick=(e)=>{
    e.preventDefault();

            if(!parent  && !parentId){

                  if(family.isMarried){

                        if(family.name && family.dob && family.phoneNo && family.address && family.spouse&&family.weddingDay){

                              let userOnly = {...family,id:uuidv4()}
                                dispatch({type:"ADD__USER__NO__CHILD",userOnly})
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

                              //error check

                        }



                  }else{

                      if(family.name && family.dob && family.phoneNo && family.address){
                        let userOnly = {...family,id:uuidv4(),spouse:"",weddingDay:"",child:[]}
                        dispatch({type:"ADD__USER__NO__CHILD",userOnly})
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
                        //check Error
                      }


                  }

                  return;

            }





      if(parent){
        if(family.isMarried){

                
          if(family.name && family.dob && family.phoneNo && family.address && family.spouse&&family.weddingDay){

            const findAndReplaceElement = (arr, id, updatedElement) => {
              return arr.map((obj) => {
                if (obj.id === id) {
                  return updatedElement;
                } else if (obj.child && obj.child.length > 0) {
                  return {
                    ...obj,
                    child: findAndReplaceElement(obj.child, id, updatedElement),
                  };
                }
                return obj;
              });
            };
                let firstSubmit = findAndReplaceElement(tempData,childId,family)


                dispatch({type:"ADD__ELE__FIRST__SUBMIT",firstSubmit,parent})
                navigate(-1)

          }else{

            //Error Check
          }

        
        
        }else{

            

                 if(family.name && family.dob && family.phoneNo && family.address){

                
                  const findAndReplaceElement = (arr, id, updatedElement) => {
                    return arr.map((obj) => {
                      if (obj.id === id) {
                        return updatedElement;
                      } else if (obj.child && obj.child.length > 0) {
                        return {
                          ...obj,
                          child: findAndReplaceElement(obj.child, id, updatedElement),
                        };
                      }
                      return obj;
                    });
                  };
                      let firstSubmit = findAndReplaceElement(tempData,childId,family)
      
      
                      dispatch({type:"ADD__ELE__FIRST__SUBMIT",firstSubmit,parent})
                      navigate(-1)
               

                 }else{

                     //Error Check

                 }
                  

              




        }
      }else{

        if(family.isMarried){

                
          if(family.name && family.dob && family.phoneNo && family.address && family.spouse&&family.weddingDay){

            const findAndReplaceElement = (arr, id, updatedElement) => {
              return arr.map((obj) => {
                if (obj.id === id) {
                  return updatedElement;
                } else if (obj.child && obj.child.length > 0) {
                  return {
                    ...obj,
                    child: findAndReplaceElement(obj.child, id, updatedElement),
                  };
                }
                return obj;
              });
            };
                let nestedSubmit = findAndReplaceElement(tempData,childId,family)
                dispatch({type:'Add__ALL__NESTED__DATA',nestedSubmit})
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

            //Error Check
          }

        
        
        }else{

            

                 if(family.name && family.dob && family.phoneNo && family.address){

                
                  const findAndReplaceElement = (arr, id, updatedElement) => {
                    return arr.map((obj) => {
                      if (obj.id === id) {
                        return updatedElement;
                      } else if (obj.child && obj.child.length > 0) {
                        return {
                          ...obj,
                          child: findAndReplaceElement(obj.child, id, updatedElement),
                        };
                      }
                      return obj;
                    });
                  };
                      let nestedSubmit = findAndReplaceElement(tempData,childId,family)
                      dispatch({type:'Add__ALL__NESTED__DATA',nestedSubmit})

      
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

                     //Error Check

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
            <input type="file" accept="image/*" id='file' name=' baptism' onChange={changeHandler} />
            </div>
        )}
      <div className='btn-submit'>
      <button onClick={handleClick} type='submit'>Submit</button>
      </div>
    </form>
  )
}

export default MainForm