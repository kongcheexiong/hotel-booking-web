import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./publicRoute";

//components


//Pages
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/login/Login";

import Layout from "../layouts/layout";

//router
import { router } from "../constants/index";
const Test = () => <h1>test</h1>;

function MyRouter() {
  return (
    <Router>
      <Routes>
        {/** not log in */}
        <Route exact path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route exact path={`${router.DASHBOARD}`} element={<Dashboard />} />
          <Route exact path={`${router.SERVICES}`} element={<Test />} />
          <Route exact path={`${router.SETTING}`} element={<Test />} />
          <Route exact path={`${router.CUSTOMER}`} element={<Test />} />
          <Route exact path={`${router.ORDER}`} element={<Test />} />
          <Route exact path={`${router.NOTIFICATION}`} element={<Test />} />
          <Route exact path={`${router.PAYMENT}`} element={<Test />} />
          <Route exact path={`${router.INVOICE}`} element={<Test />} />
          <Route exact path={`${router.SHOPS}`} element={<Test />} />
          
        </Route>

        {/** log in successfully */}
        {/**<Route
          element={() => {
            <React.Fragment>
              <div
                style={{
                  background: "#eeee",
                  overflow: "hidden",
                  transition: "all 0.15s ",
                }}
              >
                <SideNav />
                <div
                  style={{
                    minHeight: "100vh",
                    marginLeft: "270px",
                  }}
                >
                
                  <PrivateRoute
                    path={`${router.DASHBOARD}`}
                    exact
                    component={() => <Dashboard />}
                  />
                </div>
              </div>
            </React.Fragment>;
          }}
        /> */}
      </Routes>
    </Router>
  );
}

export default MyRouter;
