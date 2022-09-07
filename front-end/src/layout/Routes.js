import { React, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import CreationForm from "../creationForm/CreationForm";
import TableCreationForm from "../creationForm/TableCreationForm";
import SeatComponent from "../SeatComponent/SeatComponent";
import useQuery from "../utils/useQuery";
import { today } from "../utils/date-time";

// import { today } from "../utils/date-time";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
 
  const query = useQuery();
  const date = query.get("date") || today();
  // const [date, setDate] = useState(date2 ? date2 : today());

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        {/* {date2? <Dashboard date={date2} setDate={setDate}/> : <Dashboard date={date} setDate={setDate}/>} */}
        <Dashboard date={date}/>
      </Route>
      <Route path="/reservations/new">
      <CreationForm />
      </Route>
      <Route path="/tables/new">
      <TableCreationForm/>
      </Route>
      <Route path="/reservations/:reservation_id/seat">
      <SeatComponent />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;



// import {React, useState} from "react";

// import { Redirect, Route, Switch } from "react-router-dom";
// import Dashboard from "../dashboard/Dashboard";
// import NotFound from "./NotFound";
// import CreationForm from "../creationForm/CreationForm";
// import { today } from "../utils/date-time";
// import TableCreationForm from "../creationForm/TableCreationForm";
// import SeatComponent from "../SeatComponent/SeatComponent";
// import useQuery from "../utils/useQuery"


// /**
//  * Defines all the routes for the application.
//  *
//  * You will need to make changes to this file.
//  *
//  * @returns {JSX.Element}
//  */
// function Routes() {
//   const query = useQuery();
//   const [date, setDate] = useState(today())
//   const date2 = query.get('date')
  
//   return (
//     <Switch>
//       <Route exact={true} path="/">
//         <Redirect to={"/dashboard"} />
//       </Route>
//       <Route exact={true} path="/reservations">
//         <Redirect to={"/dashboard"} />
//       </Route>
//       <Route path="/dashboard">
//         <Dashboard date = {date} setDate = {setDate} /> {/*today()*/}
//       </Route>
//       <Route exact path = "/reservations/new">
//         <CreationForm setDate ={setDate}/>
//       </Route>
//       <Route exact path = "/tables/new">
//         <TableCreationForm/>
//       </Route>
//       <Route exact path = "/reservations/:reservation_id/seat">
//         <SeatComponent />
//       </Route>
//       <Route>
//         <NotFound />
//       </Route>
//     </Switch>
//   );
// }

// export default Routes;
