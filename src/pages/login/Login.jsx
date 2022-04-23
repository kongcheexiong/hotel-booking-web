import { Button, Stack, TextField } from "@mui/material";
import { borderRadius, fontSize, height, width } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import './login.css'

// auth
import Auth from "../../auth.js";
import { router } from "../../constants/index.js";

//connstant
import { color } from "../../constants/index.js";

//logo
const textStyle = {
  backgroundColor: "rgba(250, 250, 251, 1)",
  borderRadius: "10px",

  width: "300px",
  "& fieldset": {
    borderRadius: "10px",
  },
};
const btnStyle = {
  "&.MuiButton-root": {},
  "&.MuiButton-text": {
    color: "grey",
  },
  "&.MuiButton-contained": {
    color: "white",
  },
  "&.MuiButton-outlined": {
    color: "brown",
  },
};

function Login() {
  const navigate = useNavigate();
  return (
    <div
      className="login"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: color.YELLLOW_COLOR,
          width: "400px",
          height: "550px",
          padding: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/**company logo */}
        <div>
          <img src="../../IMG.JPG" alt="img" height={100} />
        </div>
        <h1 className="en">Finder Service</h1>
        {/**form */}
        <Stack direction="column">
          <label>ອີເມວ</label>

          <TextField
            id="email"
            placeholder="name@example.com"
            size="small"
            sx={{ ...textStyle }}
          />
          <br />
          <label>ລະຫັດຜ່ານ</label>
          <TextField
            id="password"
            placeholder="password..."
            size="small"
            sx={{ ...textStyle }}
          />
          <br />
          {/**login button */}
          <Stack justifyContent="space-between">
            <Button
              sx={{ ...btnStyle }}
              variant="contained"
              onClick={() => {
                Auth.logIn(() => {
                  navigate(`${router.DASHBOARD}`, { replace: true });
                });
              }}
            >
              Login
            </Button>
          </Stack>
        </Stack>
      </div>
    </div>
  );
}

export default Login;
