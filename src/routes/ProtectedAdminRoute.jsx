import * as react from "react";
import { Route, Navigate } from "react-router-dom";
import Auth from "../auth";

import { authContext } from "../context/authContext";

import { router } from "../constants";

const ProtectedAdminRoute = (props) => {
  //const { auth } = react.useContext(authContext);
  //const token = auth.accessToken;s
  const token = localStorage.getItem('adminToken')
  
  const { children } = props;

  if (!token) {
    return <Navigate to={`${router.ADMIN}`} replace />;
  }

  

  return children;
};

export default ProtectedAdminRoute;
