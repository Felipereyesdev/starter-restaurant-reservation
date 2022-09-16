import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ListReservations from "./ListReservations";
import ListTables from "./ListTables";
import { today, next, previous } from "../utils/date-time";
import useQuery from "../utils/useQuery"; //**
import { useHistory } from "react-router-dom";

function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null);
  const [tables, setTables] = useState([]);
  const query = useQuery(); //**
  const date = query.get("date") || today(); //**

  const history = useHistory();

  useEffect(loadDashboard, [date]);
  function loadDashboard() {
    //needs to be renamed to loadReservations
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  useEffect(loadTables, []);
  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null); //
    listTables(abortController.signal) //
      .then(setTables) //
      .catch(setTablesError); //
    return () => abortController.abort();
  }

  return (
    <main>
      <div className="d-flex flex-row justify-content-center mt-2 header-test">
        <div >
        <h1 >Dashboard</h1>

        <h4 >Reservations for {date}</h4>
        </div>
        <div className="dashboard-buttons" >
          <button
            className="button-color-1 mr-1"
            onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
          >
            Previous
          </button>
          <button
            className="button-color-3 mr-1"
            onClick={() => history.push(`/dashboard?date=${today()}`)}
          >
            Today
          </button>
          <button
            className="button-color-2"
            onClick={() => history.push(`/dashboard?date=${next(date)}`)}
          >
            Next
          </button>
          </div>
        
      </div>
      <hr className="separator--line" />
      <div className="row">
        <div className="col  ">
          <h2 className="titles">Reservations:</h2>
          {reservations.length !== 0 ? (
            <ListReservations
              reservations={reservations}
              loadDashboard={loadDashboard}
            />
          ) : (
            <h2 className="titles">There are no reservations today</h2>
          )}
        </div>

        <ErrorAlert error={reservationsError} />
        <hr />
        <div className="col ">
          <h2 className="titles">Tables:</h2>
          <div className="col d-flex flex-wrap ">
            <ListTables
              tables={tables}
              loadTables={loadTables}
              loadDashboard={loadDashboard}
            />
          </div>
        </div>
      </div>
      <ErrorAlert error={tablesError} />
    </main>
  );
}

export default Dashboard;
