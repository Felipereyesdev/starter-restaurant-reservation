import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ListReservations from "./ListReservations";
import {previous, next, today} from "../utils/date-time"
import ListTables from "./ListTables";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({date,setDate}) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, settablesError] = useState(null);
  const [tables, setTables ] = useState([]);
  

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

      settablesError(null);
      listTables(abortController.signal)
      .then(setTables)
      .catch(settablesError);


    return () => abortController.abort();
  }
  console.log(tables)

  return (
    <main>
      <h1>Dashboard</h1>
      {/* <button>seat</button> */}
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <ListReservations reservation={reservations}/>
      
      <button className="btn btn-secondary mr-2 pt-2 pb-2" onClick={() => {setDate(today())}}>Today</button>
      <button className="btn btn-secondary mr-2 pt-2 pb-2" onClick={() => {setDate(previous(date))}}>Previous day</button>
      <button className="btn btn-secondary mr-2 pt-2 pb-2" onClick={() => {setDate(next(date))}}>Next day</button>

      <div>
        <ListTables tables = {tables}/>
        <ErrorAlert error={tablesError} />
      </div>
      
    </main>
  );
}

export default Dashboard;
