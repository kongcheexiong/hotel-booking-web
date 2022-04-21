import { Button } from "@mui/material";
import React from "react";
import {  useNavigate } from "react-router-dom";

// auth
import Auth from "../../auth.js";
import { router } from "../../constants/index.js";

function Login() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>
        welcome to login page
      </h1>
      <button
        onClick={() => {
          Auth.logIn(() => {
            navigate(`${router.DASHBOARD}`, { replace: true })
          });
        }}
      >
        login
      </button>

    </div>
  );
}

export default Login;
