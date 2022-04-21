import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./publicRoute";

//components
import SideNav from "../components/sideNav/sideNav";

//Pages
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/login/Login";

//router
import { router } from "../constants/index";

function Test() {
  return (
     
    <Router>
      <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>

         
        
        
      </Routes>
    </Router>
  );
}

export default Test;
