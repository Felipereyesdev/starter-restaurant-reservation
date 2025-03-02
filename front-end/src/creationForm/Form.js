import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { formatAsDate } from "../utils/date-time";

export default function Form({
  submitHandler,
  newReservation,
  errors,
  title,
}) {
   
  const history = useHistory();
  const [formData, setFormData] = useState(newReservation);

  // console.log('string',newReservation,'string2',formData)

  useEffect(() => {
    setFormData({
      ...newReservation,
      reservation_date: newReservation.reservation_date
        ? formatAsDate(newReservation.reservation_date)
        : "",
    });
  }, [newReservation]);
  //()=>setFormData is invoking the full function in use effect, while just setFormData would just be giving the value of setFormData and no function

  const handleChange = (event) => {
    const { target } = event;
    const value = target.value;
    setFormData({ ...formData, [target.name]: value });
  };
  // console.log("formComponent", formData, newReservation);
  // console.log("line30 of formComponent", formData);
  return (
    
    <>
    
      <form className="form" onSubmit={(e) => submitHandler(e, formData)}>
      <h2 className="titles">{title}</h2>
      <hr className="separator--line" />
        <div>
          <input
            name="first_name"
            value={formData.first_name}
            placeholder={formData.first_name || "First Name"}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            name="last_name"
            value={formData.last_name}
            placeholder={formData.last_name || "Last Name"}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="string"
            name="mobile_number"
            value={formData.mobile_number}
            placeholder={formData.mobile_number || "Mobile Number"}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="number"
            name="people"
            value={formData.people}
            placeholder="Party Size"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            name="reservation_date"
            type="date"
            value={formData.reservation_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="time"
            name="reservation_time"
            value={formData.reservation_time}
            onChange={handleChange}
          />
        </div>
        <ErrorAlert error={errors} />
        <div>
        <button type="submit" className="button-color-2">Submit</button>

        <button
          data-reservation-id-cancel={formData.reservation_id}
          type="button"
          className="button-color-1"
          onClick={() => {
            history.go("-1");
          }}
        >
          Cancel
        </button>
        </div>
      </form>
    </>
  );
}