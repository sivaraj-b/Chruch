import React, { useEffect } from 'react'
import { createContext,useContext,useReducer } from "react";
import { reducer } from '../Reducer/reducer';
const tempFamilyData= localStorage.getItem("tempData")
    ? JSON.parse(localStorage.getItem("tempData"))
    : [];



const GlobalContext =createContext();
export const useGlobalContext = ()=>useContext(GlobalContext);
const initialState = {
    data:[],
    tempData:tempFamilyData,
    editId:'',
    isEdit:false,
    parentId:'',
}


function Context({children}) {
    const [state,dispatch] =useReducer(reducer,initialState)
    useEffect(()=>{
      localStorage.setItem('tempData',JSON.stringify(state.tempData));
  },[state.tempData])
    console.log(state)
  return (
    <GlobalContext.Provider value={{...state,dispatch}}>{children}</GlobalContext.Provider>
  )
}

export default Context