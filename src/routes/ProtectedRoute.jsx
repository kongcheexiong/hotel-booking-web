import React from "react";
import { Route, Navigate } from "react-router-dom";
import Auth from "../auth";

export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (Auth.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return (
            <Navigate to="/"
              
            />
          );
        }
      }}
    />
  );
};
