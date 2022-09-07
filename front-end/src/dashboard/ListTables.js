export default function ListTables ({ tables }) {
    const list = tables.map((table)=> {
      return (
        <div key={table.table_id}>
        <p><b>Table Name: </b>{table.table_name}</p>
        <p><b>Table Capacity: </b>{table.capacity}</p>
        <p><b>Is Reserved: </b><span data-table-id-status={table.table_id}>{table.reservation_id ? `occupied` : `Free`}</span></p>
  
        <hr/>
        </div>
      )
    }) 
    return (
      <>
      {list}
      </>
    )
  }



// function ListTables({tables}){
//     const list = tables.map((table) =>{
//         return (
//             <div key ={table.table_id}>
//                 <p><b>Table Name:</b>{table.table_name}</p>
//                 <p><b>Table capacity:</b>{table.capacity}</p>
//                 <p><b>is Reserver:</b>{!table.reservation_id ? 'is available': 'Occupied'}</p>
//                 <br></br>

//             </div>

//         );
//     })
//    return (
//     <>
//     {list}
//     </>
//    ); 

// }

// export default ListTables;