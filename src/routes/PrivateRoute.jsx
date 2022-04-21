import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";

import auth from "../auth";
import { router } from "../constants";

import Login from "../pages/login/Login";
//import { USER_ACCESS_TOKEN } from "../constants";
function PrivateRoute({ component: Component, ...rest }) {
  const navigate = useNavigate();
  //const token = localStorage.getItem(USER_ACCESS_TOKEN);
  //const isAuthenticated = token === null ? false : true;
  return (
    
    <Route
      {...rest}
      element={(props) =>{
        if (auth.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return (
            <div>
              navigate({`${router.LOGIN}`});
            <Login/>

            </div>
            
          );
        }
      }
       
      }
    />
  );
}

export default PrivateRoute;
