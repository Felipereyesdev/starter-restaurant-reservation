import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createTable, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";


export default function TableCreationForm() {
  const history = useHistory();
  const [tables, setTables] = useState([])
  const [tablesError, setTablesError] = useState(null);
  const [errors, setErrors] = useState(null);

  const [newTable, setNewTable] = useState({
    table_name: "",
    capacity: "",
  });

  useEffect(loadTables, []);
  
  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal)
    .then(setTables)
    .catch(setTablesError);
    return () => abortController.abort();
  }

  const handleChange = (event) => {
    const { target } = event;
    const value = target.value;
    setNewTable({ ...newTable, [target.name]: value });
    // console.log("value", [target.name], value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    newTable.capacity = Number(newTable.capacity);
    // console.log(newTable)
    createTable(newTable)
    // .then(setTables(newTable))
    //create call back to receive new table for id from create table
      .then((updatedTable)=>{
        setTables([...tables,updatedTable])
      })
      .then(()=>history.push("/"))
      .catch(setErrors);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          <input
            type="text"
            name="table_name"
            value={newTable.table_name}
            placeholder="table name"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="number"
            name="capacity"
            value={newTable.capacity}
            placeholder="capacity"
            onChange={handleChange}
          />
        </div>
        <ErrorAlert error={errors} />
        <ErrorAlert error={tablesError} />
        <button type="submit">Submit</button>
        <button
          onClick={() => {
            history.go("-1");
          }}
        >
          Cancel
        </button>
      </form>
    </>
  );
}




// import { useState } from "react";
// import { createTable } from "../utils/api";
// import { useHistory } from "react-router-dom";
// import ErrorAlert from "../layout/ErrorAlert";
// function TableCreationForm(){
//     const history = useHistory();


//     const [newTable, setnewTable] = useState({
//         table_name: "",
//         capacity: "",
        
//       });
//       const [errors, setErrors] = useState(null)

//     const handleChange = (event) => {
//         const { target } = event;
//         const value = target.value;
//         setnewTable({ ...newTable, [target.name]: value });
//         // console.log("value", [target.name], value);
//       };
    
//       const submitHandler = (event) => {
//        event.preventDefault();
//        newTable.capacity = Number(newTable.capacity);
//        createTable(newTable)
//        .then(() => {
//         history.push("/")
//        })
//        .catch(setErrors)
//       };
//     return (
//         <>
//       <form onSubmit={submitHandler}>
//         <div>
//           <input
//             name="table_name"
//             type = "text"
//             placeholder="table_name"
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <input
//             name="capacity"
//             placeholder="capacity"
//             type = "number"
//             onChange={handleChange}
//             required
//           />
//         </div>
       
//         <ErrorAlert error={errors}/>
//           <button type="submit">Submit</button>
//           <button
//         onClick={() => {
//           history.go("-1");
//         }}
//       >
//         Cancel
//       </button>
//       </form>
//       </>

//     );
// }

// export default TableCreationForm;