function ListTables({tables}){
    const list = tables.map((table) =>{
        return (
            <div key ={table.table_id}>
                <p><b>Table Name:</b>{table.table_name}</p>
                <p><b>Table capacity:</b>{table.capacity}</p>
                <p><b>is Reserver:</b>{!table.reservation_id ? 'is available': 'Occupied'}</p>

            </div>

        );
    })
   return (
    <>
    {list}
    </>
   ); 

}

export default ListTables;