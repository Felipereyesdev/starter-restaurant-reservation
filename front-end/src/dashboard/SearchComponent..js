import { useState } from "react";
import {  listReservations } from "../utils/api";
import ListReservations from "../dashboard/ListReservations"

export default function SearchComponent(){
  // const history = useHistory()
  const [formData, setFormData] = useState({})
  const [reservations, setReservations] = useState([])


  // console.log('phone',phoneNumber)

  const handleChange = (event) => {
    const { target } = event;
    const value = target.value;
    console.log('value',[target.name],value)
    setFormData({ ...formData, [target.name]: value });
    // console.log("value", [target.name], value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    listReservations( formData, abortController.signal )
    .then((response)=>setReservations(response))
    .catch((error)=>console.log(error));
    return () => abortController.abort()
  };

  return (
    <>
    <form
    onSubmit={submitHandler}
    >
      <label>Mobile Number</label> <input onChange={handleChange} type="search" name="mobile_number" placeholder="Enter a customer's phone number"></input> <button type="submit">Find</button>
    </form>
    {reservations.length !== 0 ? <ListReservations reservations={reservations}/> : `No reservations found with this phone number`}
    </>
  )
}