import { useState } from "react";
import { createTable } from "../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
function TableCreationForm(){
    const history = useHistory();


    const [newTable, setnewTable] = useState({
        table_name: "",
        capacity: "",
        
      });
      const [errors, setErrors] = useState(null)

    const handleChange = (event) => {
        const { target } = event;
        const value = target.value;
        setnewTable({ ...newTable, [target.name]: value });
        // console.log("value", [target.name], value);
      };
    
      const submitHandler = (event) => {
       event.preventDefault();
       newTable.capacity = Number(newTable.capacity);
       createTable(newTable)
       .then(() => {
        history.push("/")
       })
       .catch(setErrors)
      };
    return (
        <>
      <form onSubmit={submitHandler}>
        <div>
          <input
            name="table_name"
            type = "text"
            placeholder="table_name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            name="capacity"
            placeholder="capacity"
            type = "number"
            onChange={handleChange}
            required
          />
        </div>
       
        <ErrorAlert error={errors}/>
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

export default TableCreationForm;