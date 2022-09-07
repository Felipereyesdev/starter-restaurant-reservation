import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables, updateTable } from "../utils/api";
// import ListTablesComp from "../dashboard/ListTablesComp"
export default function SeatComponent() {
  const history = useHistory();
  const [tableId, setTableId] = useState();
  const [tablesError, setTablesError] = useState(null);
  const [tables, setTables] = useState([]);

  useEffect(loadTables, []);

  let params = useParams();
  let reservation_id = params.reservation_id;

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  const handleChange = (event) => {
    const { target } = event;
    const value = target.value;
    console.log("value", [target.name], value);
    // setTableStatus({ ...tableStatus, table_id: value });
    setTableId(value);
    // console.log("value", [target.name], value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    reservation_id = Number(reservation_id);
    updateTable(tableId, reservation_id)
      // .then(setTableStatus(tableStatus.reservation_id))
      // .then((updatedTable) => {
      //   console.log("updatedTable", updatedTable, "tables", tables);
      // })
      // .then(()=>setTableId(null))
      .then(()=>history.push("/dashboard"))
      // .catch(setTablesError);
      .catch(error=>console.log('error',error))
  };

  const tablesForm = tables.map((table) => {
    // console.log("hello", table.reservation_id);
    return (
      <>
        <option key={table.table_id} value={table.table_id}>
          {table.table_name} - {table.capacity}
        </option>
      </>
    );
  });

  return (
    // <ListTablesComp tables={tables}/>
    <form onSubmit={submitHandler}>
      <select name="table_id" value={tableId} onChange={handleChange}>
        {tablesForm}
        <option>none</option>
      </select>
      <button type="submit">Submit</button>
      <button type="button" onClick={() => history.goBack()}>
        Cancel
      </button>
      <ErrorAlert error={tablesError} />
    </form>
  );
}