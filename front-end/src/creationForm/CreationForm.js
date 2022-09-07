import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createRes } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import { today } from "../utils/date-time";
export default function CreationForm() {
  const history = useHistory();
  const [errors, setErrors] = useState(null);
  const query = useQuery();
  const date = query.get("date") || today();
  // const [date, setDate] = useState(date2 ? date2 : today());

  const [newReservation, setNewReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });
  
  // console.log(newReservation);

  const handleChange = (event) => {
    const { target } = event;
    const value = target.value;
    console.log('value',[target.name],value)
    setNewReservation({ ...newReservation, [target.name]: value });
    // console.log("value", [target.name], value);
  };
  console.log('newres',newReservation)

  const submitHandler = (event) => {
    event.preventDefault();
    newReservation.people = Number(newReservation.people);
    createRes(newReservation)
      .then(() => {
        history.push(`/dashboard?date=${newReservation.reservation_date}`);
      })
      .catch(setErrors);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          <input
            name="first_name"
            value={newReservation.first_name}
            placeholder="First Name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            name="last_name"
            value={newReservation.last_name}
            placeholder="Last Name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="string"
            name="mobile_number"
            value={newReservation.mobile_number}
            placeholder="Mobile Number"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="number"
            name="people"
            value={newReservation.people}
            placeholder="Party Size"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            name="reservation_date"
            type="date"
            value={newReservation.reservation_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="time"
            name="reservation_time"
            value={newReservation.reservation_time}
            onChange={handleChange}
          />
        </div>
        <ErrorAlert error={errors} />
        <button type="submit">Submit</button>
        
        <button type="button"
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
// import { useHistory } from "react-router-dom";
// import { createRes } from "../utils/api";
// import ErrorAlert from "../layout/ErrorAlert";

// export default function NewReservation({setDate}) {
//   const history = useHistory();
//   const [errors, setErrors] = useState(null)

//   const [newReservation, setNewReservation] = useState({
//     first_name: "",
//     last_name: "",
//     mobile_number: "",
//     reservation_date: "",
//     reservation_time: "",
//     people: "",
//   });
//   // console.log(newReservation);


//   const handleChange = (event) => {
//     const { target } = event;
//     const value = target.value;
//     setNewReservation({ ...newReservation, [target.name]: value });
//     // console.log("value", [target.name], value);
//   };

//   const submitHandler = (event) => {
//     event.preventDefault();
//     newReservation.people = Number(newReservation.people)
//     createRes(newReservation)
//     .then(()=>{
//       setDate(newReservation.reservation_date)
//       history.push("/reservations");
//     })
//     .catch(setErrors)
//   };

//   return (
//     <>
//       <form onSubmit={submitHandler}>
//         <div>
//           <input
//             name="first_name"
//             value={newReservation.first_name}
//             placeholder="First Name"
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <input
//             name="last_name"
//             value={newReservation.last_name}
//             placeholder="Last Name"
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <input
//             type="string"
//             name="mobile_number"
//             value={newReservation.mobile_number}
//             placeholder="Mobile Number"
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <input
//             type="number"
//             name="people"
//             value={newReservation.people}
//             placeholder="Party Size"
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <input
//             name="reservation_date"
//             type="date"
//             value={newReservation.reservation_date}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <input
//             type="time"
//             name="reservation_time"
//             value={newReservation.reservation_time}
//             onChange={handleChange}
//           />
//         </div>
//         <ErrorAlert error={errors}/>
//           <button type="submit">Submit</button>
//       </form>
//       <button
//         onClick={() => {
//           history.go("-1");
//         }}
//       >
//         Cancel
//       </button>
//     </>
//   );
// }