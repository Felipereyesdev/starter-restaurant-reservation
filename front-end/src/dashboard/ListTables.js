import { useHistory } from "react-router"
import { updateResId } from "../utils/api"

export default function ListTables ({ tables }) {
  const history = useHistory()

  function clickHandler(event){
    let tableId = event.target.value
    tableId = Number(tableId)
    console.log(event.target.value)
    if(window.confirm("Is this table ready to seat new guests?")===true){
      updateResId(tableId)
      .then(()=>history.go(0))
      .catch(error=>console.log('error',error))
    }
  }

  const list = tables.map((table)=> {
    return (
      
      <div key={table.table_id} className ="col-4 border border-secondary tables p-3 mb-3 mr-3">
      <p><b>Table Name: </b>{table.table_name}</p>
      <p><b>Table ID:</b> {table.table_id}</p>
      <p><b>Table Capacity: </b>{table.capacity}</p>
      <p><b>Is Reserved: </b><span data-table-id-status={table.table_id}>{table.reservation_id ? `occupied` : `Free`}</span></p>
      {table.reservation_id ? <button className="button-color-1" value={table.table_id} data-table-id-finish={table.table_id} onClick={clickHandler}>Finish</button> : null}
      
      </div>
    )
  }) 
  return (
    <>
    {list}
    </>
  )
}



