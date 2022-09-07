export default function ListReservations({ reservations, currentRes, setCurrentRes }) {
  // console.log('listResComp',reservations, 'currentRes',currentRes);
  console.log(reservations)
  let list = reservations.map((reservation) => {
    return (
      <div key={reservation.reservation_id}>
        <p>
          <b>Reservation Date</b> : {reservation.reservation_date}
        </p>
        <p>
          <b>Guest Name</b> : {reservation.first_name} {reservation.last_name}
        </p>
        <p>
          <b>Party Size</b> : {reservation.people}
        </p>
        <p>
          <b>Contact</b> : {reservation.mobile_number}
        </p>
        <p>
          <b>Reservation Time</b> : {reservation.reservation_time}
        </p>
        <p>
          <b>Reservation ID</b>: {reservation.reservation_id}
        </p>
        <a href={`/reservations/${reservation.reservation_id}/seat`}>
          {/* <button>Seat</button> */}
          Seat
        </a>
        <hr />
      </div>
    );
  });
  return (
    <>
      <div>
        {list}
        {/* {reservations.length === 0 ? list : "There are no reservations for this date"} */}
      </div>
    </>
  );
}




// function ListReservations({ reservation }) {
//   return (
//     <div className="div">
//       <h2>Today's Reservations</h2>
//       <div>
//         <h4>
//           {reservation.map((reser) => (
//             <div key={reser.reservation_id} className="reservation_info">
//               <div>{reser.first_name}</div>
//               <div>{reser.last_name}</div>
//               <div>{reser.mobile_number}</div>
//               <div>{reser.reservation_date}</div>
//               <div>{reser.reservation_time}</div>
//               <div>{`reservation_id:${reser.reservation_id}`}</div>
//               <div>{`Number of people: ${reser.people}`}</div>
//               <a href={`/reservations/${reser.reservation_id}/seat`}>
//           <button>Seat</button>
//         </a>
//             </div>
//           ))}
//         </h4>
        
//       </div>
//     </div>
//   );
// }
// export default ListReservations;
