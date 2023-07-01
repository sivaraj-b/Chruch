import React, { useEffect } from 'react'
import { createContext,useContext,useReducer } from "react";
import { reducer } from '../Reducer/reducer';
const tempFamilyData= localStorage.getItem("tempData")
    ? JSON.parse(localStorage.getItem("tempData"))
    : [];
    const parentTrack= localStorage.getItem("parentId")
    ? JSON.parse(localStorage.getItem("parentId"))
    : [];
const FamilyData= localStorage.getItem("familyData")
? JSON.parse(localStorage.getItem("familyData"))
: [];

const GlobalContext =createContext();
export const useGlobalContext = ()=>useContext(GlobalContext);
const initialState = {
    data:FamilyData,
    tempData:[...FamilyData,...tempFamilyData],
    editId:'',
    isEdit:false,
    parentId:parentTrack,
}


function Context({children}) {
    const [state,dispatch] =useReducer(reducer,initialState)
    useEffect(()=>{
      localStorage.setItem('tempData',JSON.stringify(state.tempData));
  },[state.tempData])
    
  useEffect(()=>{
    localStorage.setItem('parentId',JSON.stringify(state.parentId));
},[state.parentId])

useEffect(()=>{
  localStorage.setItem('familyData',JSON.stringify(state.data));
},[state.data])

    console.log(state)
  return (
    <GlobalContext.Provider value={{...state,dispatch}}>{children}</GlobalContext.Provider>
  )
}

export default Context