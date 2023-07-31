import React,{useEffect, useState} from 'react'
import './mainform.css'
import { v4 as uuidv4 } from 'uuid';
import FormName from '../FormName/FormName'
import {AiOutlineCloseCircle, AiOutlineCloudUpload, AiOutlineUser} from 'react-icons/ai'
import {  Link, useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from '../../Context/Context';
import {MdGppGood} from 'react-icons/md'
import ImageResizer from 'react-image-file-resizer';
import {FcDownload} from 'react-icons/fc'
import {BsTrash} from 'react-icons/bs'
function MainForm({name}) {
  const [once,setOnce] = useState(false);
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
      baptism:'',
      isMarried:false,
      child:[],
  })
//temp data
const {tempData,dispatch,parentId,editId , isEdit, data, tempEditId} =useGlobalContext()
  const [isEditId,setIsEditId] = useState(editId);

console.log(once)
  console.log( tempEditId)
  console.log(`parentId ${parentId}`)
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

const [editTemp,setEditTemp] = useState(false)










    // navigate to Another Page
  const navigate =useNavigate()
 //take id from url
let {parent,childId}=useParams()
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





useEffect(()=>{
 

  if(childId){
    
  

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




      if(!parent && parentId  && !editId){
        
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


},[childId,editId,tempEditId])


useEffect(()=>{
  console.log("EFFECTIN")
  if(!parent && editId && isEdit && editTemp){

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

    let foundDetail 
      if(editTemp){
        foundDetail  = findElement(tempData,editId)
        
      }else{
        foundDetail  = findElement(data,editId)
      }
        
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


  if(editId){
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
    let FountEle = findElement (data,editId)
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

















},[editId])


useEffect(()=>{
  if(tempEditId && isEdit){
    let foundDetail = findElement(tempData,tempEditId)
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
    return
  }
},[tempEditId])

useEffect(()=>{
  console.log("ONCE")
  if(once && !parent){
  
    let foundDetail = findElement(tempData,parentId)
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
    return
  }

  if(!parent && tempData){
    console.log("INNNNNNNNN")
    let foundDetail = findElement(tempData,tempEditId)
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
    return

  }


},[once])

const compressImage = (file) => {
  return new Promise((resolve) => {
    ImageResizer.imageFileResizer(
      file,
      300, // max width
      300, // max height
      'JPEG', // output format
      20, // quality
      0, // rotation
      (uri) => {
        resolve(uri);
      },
      'base64' // output type
    );
  });
};
//onChange Function
const changeHandler =(e)=>{
  
  const name = e.target.name;
  let value;
    if(e.target.type === "checkbox"){
       value = e.target.checked
    }else if(e.target.type === "file"){
    
        value = e.target.files[0];
        compressImage(value)
        .then((compressedImage) => {
          // Do something with the compressed image
            setFamily(prev=>{
                return {...prev,baptism:compressedImage}
            })
        })
        .catch((error) => {
          console.error('Error compressing image:', error);
        });

    } else{

      value =  e.target.value;
    };
    setFamily({...family,[name]:value})

    



    }



 
useEffect(()=>{

  if(family.name.trim()){
             
    setErr(prev=>{
        return {...prev,name:false}
    })
}

if(family.address.trim()){

  setErr(prev=>{
      return{...prev,address:false}
  })
}
if(family.phoneNo.trim()){
  setErr(prev=>{
    return{...prev,phoneNo:false}
})
}
if(family.dob.trim()){
  setErr(prev=>{
    return{...prev,dob:false}
})
}
if(family.weddingDay.trim()){
  setErr(prev=>{
    return{...prev,weddingDay:false}
})
}
if(family.spouse.trim()){
 
  setErr(prev=>{
    return{...prev,spouse:false}
})
  
}

},[family])











// Add Child Function 
const addChild=(e)=>{
  e.preventDefault();
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

if( tempEditId){
  
  console.log("IS SHANKARRRRR ADDD CHILD")
  const addChildToElementTemp = (arr, id, newChild) => {

    return arr.map((obj) => {
      if (obj.id === id) {
        return { ...obj,...family,id:tempEditId, child: [...obj.child, newChild] };
      } else if (obj.child && obj.child.length > 0) {
        return { ...obj, child:  addChildToElementTemp(obj.child, id, newChild) };
      }
      return obj;
    });
  };
   console.log("INNNN PLZZZZZZZ") 
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
  let ArrData = addChildToElementTemp(tempData,tempEditId,AddChild)
  console.log(ArrData)
  dispatch({type:"ADD__CHILD__IN__TEMP__EDIT__ELE",ArrData})
  navigate(`/child/${tempEditId}/${AddChild.id}`)
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

  return
}


    if(parent){

     
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
         }else{

          if(!family.name.trim()){
            setErr((prev=>{
                return {...prev,name:true}
            }))
        }
        if(!family.spouse.trim()){
          console.log(family.spouse)
          setErr(prev=>{
            return{...prev,spouse:true}
        })
          
        }

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




//Remove Child Function
const removeChild=(id)=>{
 
const RemovedDataTemp = family.child.filter((item)=>item.id !== id)

      setFamily((prev)=>{
          return {...prev,child:RemovedDataTemp}
      })
      dispatch({type: "REMOVED__DATA__IN__TEMP__ARR",RemovedDataTemp})




}







//It will Control Submit button
const handleClick=(e)=>{
    e.preventDefault();
    console.log(family.spouse)
    //Edit ID
    function editNestedArray(nestedArray, idToUpdate, updatedValues) {
      function edit(obj) {
        if (obj.id === idToUpdate) {
          Object.assign(obj, updatedValues);
        }
        if (obj.child && obj.child.length > 0) {
          obj.child.forEach(child => {
            edit(child);
          });
        }
      }
    
      nestedArray.forEach(obj => {
        edit(obj);
      });
    
      return nestedArray;
    }


    if(tempEditId){
        if(!parent){
          if(family.isMarried){
            if(family.name && family.dob && family.phoneNo && family.address && family.spouse&&family.weddingDay){

              let editData = editNestedArray(tempData,tempEditId,family)
              setEditTemp(false)
              dispatch({type:'EDIT__TEMP__CHILD_ONCE',editData,})
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
              setOnce(true)
              navigate(-1)
              return
            }else{
                if(!family.name.trim()){
                    setErr((prev=>{
                        return {...prev,name:true}
                    }))
                }
               
                if(!family.address.trim){
                  setErr(prev=>{
                      return{...prev,address:true}
                  })
                }
                if(!family.phoneNo.trim()){
                  setErr({...err,phoneNo:true})
                }
                if(!family.dob.trim()){
                  setErr(prev=>{
                    return{...prev,dob:true}
                })
                }
                if(!family.weddingDay.trim()){
                  setErr(prev=>{
                    return{...prev,weddingDay:true}
                })
                }
                if(!family.spouse.trim()){
                  console.log(family.spouse)
                  setErr(prev=>{
                    return{...prev,spouse:true}
                })
                  
                }
                    return
               
            }

          }else{
            if(family.name && family.dob && family.phoneNo && family.address){

              let editData = editNestedArray(tempData,parent,family)
              setEditTemp(false)
              dispatch({type:'EDIT__TEMP__CHILD_ONCE',editData,})
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
              setOnce(true)
              navigate(-1)
              return
            }else{
                if(!family.name.trim()){
                    setErr((prev=>{
                        return {...prev,name:true}
                    }))
                }
               
                if(!family.address.trim){
                  setErr(prev=>{
                      return{...prev,address:true}
                  })
                }
                if(!family.phoneNo.trim()){
                  setErr({...err,phoneNo:true})
                }
                if(!family.dob.trim()){
                  setErr(prev=>{
                    return{...prev,dob:true}
                })
                }
                
                    return
               
            }
          }
        }else{
              console.log("ALEXXXXXXXXXX")
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
              
          if(family.name && family.dob && family.phoneNo && family.address){

            let editData =editNestedArray(tempData,childId,family)
            setEditTemp(false)
            console.log(editData)
            dispatch({type:'ADD__CHILD__IN__TEMP__EDIT__ELE',ArrData:editData,})
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
            setOnce(true)
            navigate(-1)
            return
          }else{
              if(!family.name.trim()){
                  setErr((prev=>{
                      return {...prev,name:true}
                  }))
              }
             
              if(!family.address.trim){
                setErr(prev=>{
                    return{...prev,address:true}
                })
              }
              if(!family.phoneNo.trim()){
                setErr({...err,phoneNo:true})
              }
              if(!family.dob.trim()){
                setErr(prev=>{
                  return{...prev,dob:true}
              })
              }
              
                  return
             
          }
          


        }
        return
    }


        if(isEdit && editId && editTemp){
              console.log('INNNNNNNN')
            if(family.isMarried){

              if(family.name && family.dob && family.phoneNo && family.address && family.spouse&&family.weddingDay){

                let editData = editNestedArray(tempData,editId,family)
                setEditTemp(false)
                dispatch({type:'EDIT__TEMP__CHILD',editData})
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
                navigate(-1)
                return
              }else{
                  if(!family.name.trim()){
                      setErr((prev=>{
                          return {...prev,name:true}
                      }))
                  }
                 
                  if(!family.address.trim){
                    setErr(prev=>{
                        return{...prev,address:true}
                    })
                  }
                  if(!family.phoneNo.trim()){
                    setErr({...err,phoneNo:true})
                  }
                  if(!family.dob.trim()){
                    setErr(prev=>{
                      return{...prev,dob:true}
                  })
                  }
                  if(!family.weddingDay.trim()){
                    setErr(prev=>{
                      return{...prev,weddingDay:true}
                  })
                  }
                  if(!family.spouse.trim()){
                    console.log(family.spouse)
                    setErr(prev=>{
                      return{...prev,spouse:true}
                  })
                    
                  }
                      return
                 
              }


            }else{

              if(family.name && family.dob && family.phoneNo && family.address ){

                let editData = editNestedArray(tempData,editId,family)
                setEditTemp(false)
                dispatch({type:'EDIT__TEMP__CHILD',editData})
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
                navigate(-1)
                return
              }else{
                if(!family.name){
                  setErr((prev)=>{
                       return {...prev,name:true}
                  })
              }
             
              if(!family.address){
                setErr((prev)=>{
                  return {...prev,address:true}
             })
              }
              if(!family.phoneNo){
                setErr((prev)=>{
                  return {...prev,phoneNo:true}
             })
              }
              if(!family.dob){
                setErr((prev)=>{
                  return {...prev,dob:true}
             })
              }
              return


              }





            }






        }





    
            if(!parent  && !parentId && !isEdit){

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

                          if(!family.name.trim()){
                              console.log("INN NAME")
                            setErr(prev=>{
                                return {...prev,name:true}
                            })
                        }
                       console.log(err)
                        if(!family.address.trim()){

                          setErr(prev=>{
                              return{...prev,address:true}
                          })
                        }
                        if(!family.phoneNo.trim()){
                          setErr(prev=>{
                            return{...prev,phoneNo:true}
                        })
                        }
                        if(!family.dob.trim()){
                          setErr(prev=>{
                            return{...prev,dob:true}
                        })
                        }
                        if(!family.weddingDay.trim()){
                          setErr(prev=>{
                            return{...prev,weddingDay:true}
                        })
                        }
                        if(!family.spouse.trim()){
                          console.log(family.spouse)
                          setErr(prev=>{
                            return{...prev,spouse:true}
                        })
                          
                        }
                            return

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
                        if(!family.name){
                          setErr({...err,name:true})
                      }
                     
                      if(!family.name){
                        setErr((prev)=>{
                             return {...prev,name:true}
                        })
                    }
                   
                    if(!family.address){
                      setErr((prev)=>{
                        return {...prev,address:true}
                   })
                    }
                    if(!family.phoneNo){
                      setErr((prev)=>{
                        return {...prev,phoneNo:true}
                   })
                    }
                    if(!family.dob){
                      setErr((prev)=>{
                        return {...prev,dob:true}
                   })
                    }
                    return
                      }


                  }

                  return;

            }

              if(editId && isEdit && !editTemp){


                        if(family.isMarried){
                                if(family.name && family.dob && family.phoneNo && family.address && family.spouse&&family.weddingDay){
                                  let editData =editNestedArray(data,editId,family)
                                  console.log(editData)
                                  dispatch({type:"EDIT__DATA",editData})
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
                                    return
                                }else{
                                  if(!family.name.trim()){
                                    console.log("INN NAME")
                                  setErr(prev=>{
                                      return {...prev,name:true}
                                  })
                              }
                             console.log(err)
                              if(!family.address.trim()){
      
                                setErr(prev=>{
                                    return{...prev,address:true}
                                })
                              }
                              if(!family.phoneNo.trim()){
                                setErr(prev=>{
                                  return{...prev,phoneNo:true}
                              })
                              }
                              if(!family.dob.trim()){
                                setErr(prev=>{
                                  return{...prev,dob:true}
                              })
                              }
                              if(!family.weddingDay.trim()){
                                setErr(prev=>{
                                  return{...prev,weddingDay:true}
                              })
                              }
                              if(!family.spouse.trim()){
                                console.log(family.spouse)
                                setErr(prev=>{
                                  return{...prev,spouse:true}
                              })
                                
                              }
                                  return

                                }
                         
                        }else{

                              if(family.name && family.dob && family.phoneNo && family.address){
                                let editData =editNestedArray(data,editId,family)
                                console.log(editData)
                                dispatch({type:"EDIT__DATA",editData})
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
                                  return

                              }else{
                                if(!family.name){
                                  setErr((prev)=>{
                                       return {...prev,name:true}
                                  })
                              }
                             
                              if(!family.address){
                                setErr((prev)=>{
                                  return {...prev,address:true}
                             })
                              }
                              if(!family.phoneNo){
                                setErr((prev)=>{
                                  return {...prev,phoneNo:true}
                             })
                              }
                              if(!family.dob){
                                setErr((prev)=>{
                                  return {...prev,dob:true}
                             })
                              }
                              return

                              }



                        }


                          return

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
            if(!family.name.trim()){
              console.log("INN NAME")
            setErr(prev=>{
                return {...prev,name:true}
            })
        }
       console.log(err)
        if(!family.address.trim()){

          setErr(prev=>{
              return{...prev,address:true}
          })
        }
        if(!family.phoneNo.trim()){
          setErr(prev=>{
            return{...prev,phoneNo:true}
        })
        }
        if(!family.dob.trim()){
          setErr(prev=>{
            return{...prev,dob:true}
        })
        }
        if(!family.weddingDay.trim()){
          setErr(prev=>{
            return{...prev,weddingDay:true}
        })
        }
        if(!family.spouse.trim()){
          console.log(family.spouse)
          setErr(prev=>{
            return{...prev,spouse:true}
        })
          
        }
            return

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

                  if(!family.name){
                    setErr((prev)=>{
                         return {...prev,name:true}
                    })
                }
               
                if(!family.address){
                  setErr((prev)=>{
                    return {...prev,address:true}
               })
                }
                if(!family.phoneNo){
                  setErr((prev)=>{
                    return {...prev,phoneNo:true}
               })
                }
                if(!family.dob){
                  setErr((prev)=>{
                    return {...prev,dob:true}
               })
                }
                return

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

            if(!family.name.trim()){
              console.log("INN NAME")
            setErr(prev=>{
                return {...prev,name:true}
            })
        }
       console.log(err)
        if(!family.address.trim()){

          setErr(prev=>{
              return{...prev,address:true}
          })
        }
        if(!family.phoneNo.trim()){
          setErr(prev=>{
            return{...prev,phoneNo:true}
        })
        }
        if(!family.dob.trim()){
          setErr(prev=>{
            return{...prev,dob:true}
        })
        }
        if(!family.weddingDay.trim()){
          setErr(prev=>{
            return{...prev,weddingDay:true}
        })
        }
        if(!family.spouse.trim()){
          console.log(family.spouse)
          setErr(prev=>{
            return{...prev,spouse:true}
        })
          
        }
            return
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

                  if(!family.name){
                    setErr((prev)=>{
                         return {...prev,name:true}
                    })
                }
               
                if(!family.address){
                  setErr((prev)=>{
                    return {...prev,address:true}
               })
                }
                if(!family.phoneNo){
                  setErr((prev)=>{
                    return {...prev,phoneNo:true}
               })
                }
                if(!family.dob){
                  setErr((prev)=>{
                    return {...prev,dob:true}
               })
                }
                return

                 }
                  

              




        }


      }


}


console.log(family.baptism)



const handleImageDownload = (e) => {
  e.preventDefault()
  // Implement your download logic here
  // You can use the 'selectedImage' state to get the image URL and download it
  // For example, you can use the 'download' attribute to initiate the download
  const link = document.createElement('a');
  link.href = family.baptism;
  link.download = 'image.jpg';
  link.click();
};


  return (
    <form className='form'>
        <FormName name={name}/>
      <div className='form-validate'>
         <div className='form-validate__button'>
             <input id='male' type="radio" name="gender" value="male" checked={family.gender === 'male'}  onChange={changeHandler}/>
             <label htmlFor='male'>Male</label>
         </div>
         <div className='form-validate__button'>
             <input id='female' type="radio" name="gender" value="female" checked={family.gender === 'female'}  onChange={changeHandler} />
             <label htmlFor='female'>Female</label>
         </div>
         <div className='form-validate__button'>
              <input id='isMarried' type="checkbox" name="isMarried" checked={family.isMarried} onChange={changeHandler}/>
              <label htmlFor='isMarried'>Married</label>
         </div>
         <div className='form-validate__button'>
              <input id='isBaptism' type="checkbox" name="isBaptism" checked={family.isBaptism} onChange={changeHandler} />
              <label htmlFor='isBaptism'>Baptism</label>
         </div>
      </div>
      <div className='form-detail'>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id='name' name='name'  className={`${err.name?'placeholder-color':""}`} placeholder={err.name?' Please fill name':'Enter your name'} value={family.name} onChange={changeHandler} />
          </div>
        {family.isMarried&&(
               <div>
               <label htmlFor="dob" >Dob:</label>
               <input 
                            type='text'
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "text")}
                            style={{ position: "relative" }}
                            id="dob" name="dob" 
                            value={family.dob} 
                            onChange={changeHandler}
                            placeholder={err.dob?"Please enter date ":"Select a date"} 
                            className={`${err.dob?'placeholder-color':""}`}
                            />

           </div>
        )}
            
      </div>
          {!family.isMarried&&(
                 <div className='form-detail'>
                    <div>
                        <label htmlFor="dob" >Dob:</label>
                        <input 
                            type='text'
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "text")}
                            style={{ position: "relative" }}
                            id="dob" name="dob" 
                            value={family.dob} 
                            onChange={changeHandler}
                            placeholder={err.dob?"Please enter date ":"Select a date"} 
                            className={`${err.dob?'placeholder-color':""}`}
                            />
                           
                    </div>
               </div>
          )}
      <div className='form-detail'>
        <div>
          <label htmlFor="phoneNo">PhoneNo:</label>
          <input name="phoneNo"   placeholder={err.phoneNo?" Please enter phoneNumber ":" Enter phoneNumber"} 
                className={`${err.phoneNo?'placeholder-color':""}`}
                 value={family.phoneNo} 
                 onChange={changeHandler}/>
        </div>
        {family.isMarried&&(
              <div>
                  <label htmlFor="spouse">{family.gender==='male'?'Wife:':"Husband:"}</label>
                  <input type="text" id='spouse' name='spouse' className={`${err.spouse?'placeholder-color':""}`} placeholder={err.spouse?"Please enter the name":family.gender==='male'?'Enter wife name:':"Enter husband name"} value={family.spouse} onChange={changeHandler}/>
              </div>
            )}
      </div>
        {family.isMarried&&(
              <div className='form-detail'>
              <div>
                  <label htmlFor="weddingDay" >WeddingDay:</label>
                  <input id="weddingDay"
                   name="weddingDay" 
                   type='text'
                   onFocus={(e) => (e.target.type = "date")}
                   onBlur={(e) => (e.target.type = "text")}
                   style={{ position: "relative" }}
                    value={family.weddingDay} 
                    placeholder={err.weddingDay?"Please enter wedding date ":"Select a wedding date"} 
                     className={`${err.weddingDay?'placeholder-color':""}`}
                    onChange={changeHandler}/>
              </div>
              {family.isMarried&&(
                     <div className='add-btn-div'>
           
           <button onClick={addChild} type="button" class="button">
               <span class="button__text">Add Child</span>
                 <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
            </button>   
      
          
        </div>
            )}
            </div>
        )}
      <div className='form-detail-address'>
        <div className='form__address'>
               <label htmlFor="address">Address:</label>
              <textarea

                id="address"
               
                placeholder={err.address?"Please enter address ":"Enter address"} 
                className={`${err.address?'placeholder-color':""}`}
              name='address'
              value={family.address}
              onChange={changeHandler}
              />
        </div>
        {family.isMarried&&(
                     <div className='add-btn-div'>
           
           <button onClick={addChild} type="button" class="button">
               <span class="button__text">Add Child</span>
                 <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
            </button>   
      
          
        </div>
            )}
            
              {family.isMarried && family.child.length>0 &&(
                        <div className='bg-child-parent'>
                        <div  className='bg-child'>
                         {family.child.length>0&&(
                       <div className='bg-child2'>
                           {family.child.map((item)=>{
                            return<div className='link'>
                               <div className='link' onClick={()=>{
                                 setIsEditId(item.id)
                                 setEditTemp(true)
                                 dispatch({type:"EDIT__TEMP__USER",editId:item.id})
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
                              navigate(`/form`)
                            }}><p><AiOutlineUser/></p>{item.name}
                            </div>
                            <p><AiOutlineCloseCircle color='purple' className='close' onClick={()=>removeChild(item.id)}/></p>
                            </div>
                        })}
                     
                </div>
                    )}
                         </div>
                        </div>
              )}
      </div>
        {family.isBaptism&&(
           <div className='baptism-control'>
                 {family.baptism&&(
        
          <button onClick={()=>{
              setFamily({...family,baptism:''})
          }}><BsTrash color='red' fontSize={18}/></button>

       )}
                 <div className='form-img'>
                <label htmlFor="file" >{family.baptism?<p style={{display:'flex',alignItems:'center',color:'green'}}>successfully submitted <MdGppGood/> </p>:<p style={{display:'flex',alignItems:'center',}}>Baptism Certificate <AiOutlineCloudUpload/></p>}</label>
                <input type="file" accept="image/*" id='file' name=' baptism' onChange={changeHandler} />
                </div>

                {family.baptism&&(
          <button onClick={handleImageDownload}><FcDownload fontSize={18}/></button>
)}
           </div>
        )}
       

      <div className='btn-submit'>
      <button onClick={handleClick} className='button-sumbit'>
  <div class="svg-wrapper-1">
    <div class="svg-wrapper">
      <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none"></path>
        <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
      </svg>
    </div>
  </div>
  <span>Submit</span>
</button>

      </div>
    </form>
  )
}

export default MainForm