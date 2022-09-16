
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "./Form";
import { createRes } from "../utils/api";
export default function NewReservation() {

  const history = useHistory();
  const [errors, setErrors] = useState(null);

  const newReservation = {
  first_name: "",
  last_name: "",
  mobile_number: "",
  reservation_date: "",
  reservation_time: "",
  people: "",
}

const title = 'New Reservation'
  

  const submitHandler = (event, newReservation) => {
    // console.log('newResComp',newReservation)
    event.preventDefault();
    newReservation.people = Number(newReservation.people);
    createRes(newReservation)
      .then(() => {
        history.push(`/dashboard?date=${newReservation.reservation_date}`);
      })
      .catch(setErrors);
  };

  return (
    <Form
    submitHandler={submitHandler}
    errors={errors}
    newReservation={newReservation}
    title ={title}
    />
  )
}

// import { useState } from "react";
// import { useHistory } from "react-router-dom";
// import { createRes } from "../utils/api";
// import useQuery from "../utils/useQuery";
// import { today } from "../utils/date-time";
// import Form from "./Form";
// export default function CreationForm() {
//   const history = useHistory();
//   const [errors, setErrors] = useState(null);
//   const query = useQuery();
//   const date = query.get("date") || today();
//   // const [date, setDate] = useState(date2 ? date2 : today());

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
//     console.log('value',[target.name],value)
//     setNewReservation({ ...newReservation, [target.name]: value });
//     // console.log("value", [target.name], value);
//   };
//   console.log('newres',newReservation)

//   const submitHandler = (event) => {
//     event.preventDefault();
//     newReservation.people = Number(newReservation.people);
//     createRes(newReservation)
//       .then(() => {
//         history.push(`/dashboard?date=${newReservation.reservation_date}`);
//       })
//       .catch(setErrors);
//   };

//   return (
//     <Form submitHandler = {submitHandler} handleChange = {handleChange}  errors ={errors} newReservation ={newReservation}  />
//   );
// }



