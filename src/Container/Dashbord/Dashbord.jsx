
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useGlobalContext } from "../../Context/Context";




function Dashbord() {
  
  
  const initialData = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Bob" },
    { id: 4, name: "John" },
    { id: 5, name: "Jane" },
    { id: 6, name: "Bob" },
    { id: 7, name: "John" },
    { id: 8, name: "Jane" },
    { id: 9, name: "Bob" },
    { id: 10, name: "John" },
    { id: 11, name: "Jane" },
    { id: 12, name: "Bob" },
    { id: 13, name: "John" },
    { id: 14, name: "Jane" },
    { id: 15, name: "Bob" },
    { id: 16, name: "John" },
    { id: 17, name: "Jane" },
    { id: 18, name: "Bob" },
    { id: 19, name: "John" },
    { id: 20, name: "Jane" },
    { id: 21, name: "Bob" },
    { id: 22, name: "John" },
    { id: 23, name: "Jane" },
    { id: 24, name: "Bob" },
    { id: 25, name: "John" },
    { id: 26, name: "Jane" },
    { id: 27, name: "Bob" },
    { id: 28, name: "John" },
    { id: 29, name: "Jane" },
    { id: 30, name: "Bob" },
  ];


  const [datas, setData] = useState(initialData);

  const columns = [
    {
      name: "ID",
      selector: "id",
      sortable: true,
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <button onClick={() => handleEdit(row)}>Edit</button>
          <button onClick={() => handleRemove(row)}>Remove</button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  
  
  const handleEdit = (row) => {
    // Implement the edit logic here
    console.log("Edit:", row);
  };
  
  const handleRemove = (row) => {
    // Implement the remove logic here
    setData((prevData) => prevData.filter((item) => item.id !== row.id));
  };
  






  return (
    <DataTable
    columns={columns}
    data={datas}
    pagination
    highlightOnHover
    striped
  />
  )
}

export default Dashbord




