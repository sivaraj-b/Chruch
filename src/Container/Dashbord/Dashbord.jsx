import React, { useState } from 'react'
import './dashbord.css'
import { Navbar } from '../../Container'
import {FaUser} from 'react-icons/fa'
import {GiRotaryPhone} from 'react-icons/gi'
import {MdDelete} from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { data } from '../../data'
function Dashbord() {
const [currentPage,setCurrentPage] = useState(1)
const [deleteConfirmForm,setDeleteConfirmForm] = useState(false)
const recordsPerPage = 5;
const lastIndex = currentPage *recordsPerPage
const firstIndex = lastIndex-recordsPerPage
const records =data.slice(firstIndex,lastIndex);
const npage = Math.ceil(data.length/recordsPerPage)
const numbers = [...Array(npage+1).keys()].slice(1)


const prePage = ()=>{
  if(currentPage !== 1){
    setCurrentPage(currentPage -1)
   
  }else{
    toast.warn('👋 There is no previous page!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }
}
const changeCurrentPage = (id)=>{
  setCurrentPage(id)
}
const nextPage = ()=>{
  if(currentPage !== npage){
    setCurrentPage(currentPage + 1)
  }else{
    toast.warn('👋 You Are in Last Page!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }
}

const deleteHandler = (id)=>{
  setDeleteConfirmForm(true)
}

const confirmDeleteHandler = (action)=>{
    if(action === 'yes'){
      setDeleteConfirmForm(false)
      toast.success('🦄 successfully Deleted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
    if(action === 'no'){
      setDeleteConfirmForm(false)
    }
}


  return (
    <div className='dashboard'>
        <div>
            <Navbar/>
        </div>
        <div className='dashboard-scroll'>
            <table >
                <thead className='dashboard__heading'>
                  <th>ID</th>
                  <th>Name</th>
                  <th>PhoneNumber</th>
                  <th>Address</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  {records.map((data,index)=>{
                    return<tr className={`bordered-row ${index == 0 || index % 2 == 0 ?'even':'odd'}`} key={data.id}>
                        <td className='dashboard__body'>{data.id}</td>
                        <td className='dashboard__body'>
                           
                           <FaUser color='#f9ff00f2'/> {data.name}
                            
                        </td>
                        <td className='dashboard__body'>
                        
                           <GiRotaryPhone color='blue'/>
                            35253454353453
                          
                        </td>
                        <td className='dashboard__body width' >ATTN: CEO David Kenner Kenner Group Inc.85 Bradford Lane Vincentown, NJ 08120</td>
                        <td onClick={()=>deleteHandler(data.id)} className='dashboard__body-delete'><MdDelete/></td>
                    </tr>
                  })}
                </tbody>
            </table>
            <nav>
               <ul className='pagination'>
                  <li onClick={prePage}>
                      Prev
                  </li>
                  {numbers.map((page,index)=>{
                    return<li className={currentPage === page?"active":""} onClick={()=>changeCurrentPage(page)} key={index}>
                        {page}
                    </li>
                  })}
                   <li onClick={nextPage}>
                      Next
                  </li>
               </ul>
            </nav>
        </div>
            {
              deleteConfirmForm&&(
                <div className='dashboard__confirm-delete'>
                <div className='dashboard__confirm-delete__container'>
                    <h3> Are you sure you want to delete ? </h3>
                    <div className='dashboard__confirm-delete__container-button'>
                        <button onClick={()=>confirmDeleteHandler('yes')} type='button'>Yes</button>
                        <button onClick={()=>confirmDeleteHandler('no')} type='button'>No</button>
                    </div>
                </div>
      </div>
              )
            }
            <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
    </div>
  )
}

export default Dashbord