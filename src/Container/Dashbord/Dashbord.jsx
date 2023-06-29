
import React, { useState } from "react";
import DataTable from "react-data-table-component";




function Dashbord() {
  
  
  const initialData = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Bob" },
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Bob" },
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Bob" },
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Bob" },
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Bob" },
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Bob" },
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Bob" },
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Bob" },
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Bob" },
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Bob" },
  ];
  const [data, setData] = useState(initialData);

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
    data={data}
    pagination
    highlightOnHover
    striped
  />
  )
}

export default Dashbord