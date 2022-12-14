import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

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
import AddEmployee from "../pages/employee/components/AddEmployee";
import Register from "../pages/register/Register";
import RegisterInfo from "../pages/registerInfo/register.info";
import AddCheckin from "../pages/AddNewCheckin/AddCheckin";
import Landing from "../pages/advertise";

//system route
import AdminLogin from "../pages/admin/Login";
import AdminDashboard from "../pages/admin/AdminDashboard";
import HotelMap from "../pages/admin/HotelMap";
import AllHotel from "../pages/admin/AllHotel";
import AllCustom from "../pages/admin/AllCustom";

import PageNotFound from "../pages/pageNotFound";

import Layout from "../layouts/layout";

//router
import { router } from "../constants/index";

import UserDetail from "../pages/registerInfo/components/userDetail";
import HotelDetail from "../pages/registerInfo/components/hotelDetail";
import BookingOffline from "../pages/bookingOffline/Booking";
import Success from "../pages/registerInfo/components/succes";
import MoveRoom from "../pages/moveRoom/Checkin";
import AddImage from "../pages/Addimg/AddImage";

const Test = () => <h1>test</h1>;

function MyRouter() {
  const privateRoute = [
    {
      myRoute: `${router.ADD_IMG}`,
      component: <AddImage />,
    },
    {
      myRoute: `${router.MOVE_ROOM}`,
      component: <MoveRoom />,
    },
    {
      myRoute: `${router.HOTEL_BOOKING}`,
      component: <BookingOffline />,
    },
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
      myRoute: `${router.EMPLOYEEMANAGEMENT}/add`,
      component: <AddEmployee />,
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
    {
      myRoute: `${router.CHECKIN}/add`,
      component: <AddCheckin />,
    },
   //{
   //  myRoute: `${router.LOGIN}`,
   //  component: <Login />,
   //},
  ];
  const adminRoute = [
    {
      myRoute: `${router.ADMIN_DASHBOARD}`,
      component: <AdminDashboard />,
    },
    {
      myRoute: `${router.ALL_HOTEL}`,
      component: <AllHotel />,
    },
    {
      myRoute: `${router.ALL_USER}`,
      component: <AllCustom />,
    },
    {
      myRoute: `${router.MAP}`,
      component: <HotelMap />,
    },
   // {
   //   myRoute: `${router.ADMIN}`,
   //   component: <AdminLogin />,
   // },
  ];
  return (
    <Router>
      <Routes>
        {/** not log in */}
        <Route exact path={router.ADMIN} element={<AdminLogin />} />

        <Route exact path="/public" element={<Landing />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path={router.REGISTER} element={<Register />} />

        <Route element={<RegisterInfo />}>
          <Route
            exact
            path={`${router.REGISTER}/info`}
            element={<UserDetail />}
          />
          <Route
            exact
            path={`${router.REGISTER}/hotel`}
            element={<HotelDetail />}
          />
             <Route
            exact
            path={`${router.REGISTER}/hotel/success`}
            element={<Success />}
          />
          
        </Route>

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
        {/**admin user in successfully */}
        <Route element={<Layout />}>
          {adminRoute.map((data, index) => {
            return (
              <Route
                key={index}
                exact
                path={data.myRoute}
                element={
                  <ProtectedAdminRoute>{data.component}</ProtectedAdminRoute>
                }
              />
            );
          })}
        </Route>
        <Route exact path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default MyRouter;
