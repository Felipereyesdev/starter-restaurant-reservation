function ListReservations({reservation}){
return (
    <div className="div">
        <h2>Today's Reservations</h2>
        <div>
            <h4>{reservation.map((reser) =>(
                <div key= {reser.reservation_id} className="reservation_info">
                <div>{reser.first_name}</div>
                <div>{reser.last_name}</div>
                <div>{reser.mobile_number}</div>
                <div>{reser.reservation_date}</div>
                <div>{reser.reservation_time}</div>
                <div>{`Number of people: ${reser.people}`}</div>
                </div>
                
            ))}</h4>
        </div>
    </div>
);

}
export default ListReservations;