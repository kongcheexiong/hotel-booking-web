import * as react from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

//components

//Pages
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/login/Login";
import Room from "../pages/room/Room";
import Employee from "../pages/employee/Employee";
import Booking from "../pages/booking/Booking";
import Checkin from "../pages/checkin/Checkin";
import Report from "../pages/report/Report";
import RoomType from "../pages/roomType/RoomType";
import AddRoomType from "../pages/roomType/components/AddRoomType";

import Layout from "../layouts/layout";

import { authContext } from "../context/authContext";

//router
import { router } from "../constants/index";
const Test = () => <h1>test</h1>;

function MyRouter() {
  const privateRoute = [
    {
      myRoute: `${router.DASHBOARD}`,
      component: <Dashboard />,
    },
    {
      myRoute: `${router.ROOMTYPEMANAGEMENT}`,
      component: <RoomType />,
    },
    {
      myRoute: `${router.ROOMTYPEMANAGEMENT}/add`,
      component: <AddRoomType />,
    },
    {
      myRoute: `${router.ROOMMAGEMENT}`,
      component: <Room />,
    },
    {
      myRoute: `${router.EMPLOYEEMANAGEMENT}`,
      component: <Employee />,
    },
    {
      myRoute: `${router.CHECKIN}`,
      component: <Checkin />,
    },
    {
      myRoute: `${router.BOOKING}`,
      component: <Booking />,
    },
    {
      myRoute: `${router.REPORT}`,
      component: <Report />,
    },
  ];
  return (
    <Router>
      <Routes>
        {/** not log in */}
        <Route exact path="/login" element={<Login />} />
        {/**log in successfully */}
        <Route element={<Layout />}>
          {privateRoute.map((data, index) => {
            return (
              <Route
                key={index}
                exact
                path={data.myRoute}
                element={<ProtectedRoute>{data.component}</ProtectedRoute>}
              />
            );
          })}
        </Route>
      </Routes>
    </Router>
  );
}

export default MyRouter;
