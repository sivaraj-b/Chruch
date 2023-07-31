
import React, { useEffect, useState } from "react";
import './dashbord.css'
import DataTable from "react-data-table-component";
import { useGlobalContext } from "../../Context/Context";
import {AiOutlineUserAdd} from 'react-icons/ai'
import {BiEdit} from 'react-icons/bi'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {Link, useNavigate} from 'react-router-dom'
import { saveAs } from 'file-saver';


function Dashbord() {
 
    const navigate = useNavigate()


  const {data,dispatch} = useGlobalContext()
  function flattenArray(arr) {
    let result = [];
  
    function flattenHelper(arr) {
      arr.forEach(item => {
        result.push(item);
        if (item.child && item.child.length > 0) {
          flattenHelper(item.child);
        }
      });
    }
  
    flattenHelper(arr);
    return result;
  }

  

  const flattenedArray = flattenArray(data);


  const [datas, setData] = useState(flattenedArray);
  const [filterData , setFilterData] = useState(flattenedArray)

  useEffect(()=>{

   let Reset = flattenArray(data)
    setData(Reset)

  },[data]);

 

  const customStyle = {
    headRow: {
      style: {
        backgroundColor: 'blue',
        color: 'white',
        fontWeight: '900',
        fontSize: '1.5em',
        boxShadow: "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
      },
    },
   
  };
const handleDownload = async (baptism) => {
  try {
    const response = await fetch(baptism);
    const blob = await response.blob();
    const fileName = 'image.jpg'; // You can change the file extension as needed based on the image type
    saveAs(blob, fileName);
  } catch (error) {
    console.error('Error downloading the image:', error);
  }
};



const handleClick = (row) => {
  if (row.baptism) {
    handleDownload(row.baptism);
  }
};


  const columns = [
    {
      name: 'Id',
      selector: 'id',
      sortable: true,
      className: 'custom-id-column'
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
      style: {
        fontSize: '1.2em' // Change the font size here
      }
    },
    {
      name: "Baptism",
      cell: (row) =>
        row.baptism ? (
          <button className="img-certificate"
           
            onClick={() => handleClick(row)}
          
          >
              Certificate
          </button>
        ) : (
          <span style={{color:'black'}}>No Certificate</span>
        ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="btn-dashboard">
          <button className="edit-btn" onClick={() => handleEdit(row)}><BiEdit fontSize={20}/></button>
          <button className="remove-btn" onClick={() => handleRemove(row)}><RiDeleteBin6Line fontSize={20}/></button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ]
  
  
  
  const handleEdit = (row) => {
    console.log("INNNNNNNNNN")
    dispatch({type:"EDIT__USER",editId:row.id})
        navigate(`/form`)


  };
  
  const handleRemove = (row) => {
    // Implement the remove logic here
    function removeIdFromNestedArray(arr, idToRemove) {
      return arr.filter((obj) => {
        if (obj.id === idToRemove) {
          return false; // Filter out the object with the specified id
        }
        if (obj.child && obj.child.length > 0) {
          obj.child = removeIdFromNestedArray(obj.child, idToRemove); // Recursively call the function for child arrays
        }
        return true; // Keep all other objects
      });
    }
    
   
   
      console.log(row.id)
      let RemovedData = removeIdFromNestedArray(data, row.id);
      console.log(RemovedData)
        dispatch({type: "REMOVED__DATA__IN__STATE__ARR",RemovedData})

  };
  

  const handleFilter =(e)=>{
      const newData = filterData.filter((row)=>row.name.toLowerCase().includes(e.target.value.toLowerCase()) )
      setData(newData)

  }

  


  return (
      <div className="dashboard">
          <nav className="dashboard-nav">
              <div>
                <h1>FAMILY</h1>
                <div>
                <AiOutlineUserAdd fontSize={30}/>
                <Link  to='/form'>Create</Link>
                </div>
              </div>
          </nav>
          <div className="input-div">
              <input placeholder="search User Name"  onChange={handleFilter}/>
          </div>
         <div className="padding-table">
         <DataTable
    
    columns={columns}
    data={datas}
    customStyles={customStyle}
    pagination
    highlightOnHover

  />
         </div>

      </div>
  )
}

export default Dashbord




