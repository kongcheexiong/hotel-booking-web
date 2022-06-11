import { Button, Stack, TextField } from "@mui/material";
import { borderRadius, fontSize, height, width } from "@mui/system";
import * as react from "react";
import { useNavigate, Navigate } from "react-router-dom";
import "./login.css";

import axios from "axios";

// auth
import { authContext, authInitialValue } from "../../context/authContext";
import { router } from "../../constants/index.js";

//connstant
import { color } from "../../constants/index.js";
import {textStyle} from '../../style'
import { SERVER_URL } from "../../constants/index.js";

//logo

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

function Login(props) {
  {
    /**
const {auth, setAuth } = react.useContext(authContext);
  const token = auth.accessToken */
  }
  const token = localStorage.getItem("accessToken");

  const [user, setUser] = react.useState("");
  const [pwd, setPwd] = react.useState("");
  const [err, setErr] = react.useState("");
  const [success, setSuccess] = react.useState(false);
  const [loading, setLoading] = react.useState(true);

  react.useEffect(() => {
    setErr("");
  }, [user, pwd]);

  const navigate = useNavigate();

  var config = {
    method: "post",
    url: `${SERVER_URL}/api/user/login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      userName: user,
      password: pwd,
    }),
  };

  const handleLogin = async (e) => {
    setLoading(true);

    await axios(config)
      .then(function (response) {
        //const res = JSON.parse(response)
        const res = response.data;
        console.log(res);
        let token = res.accessToken;

        const userId = "" + res.user._id;
        const userName = res.user.userName;
        const hotelId = res.user.hotel._id
        const userRole = res.user.role

        setUser("");
        setPwd("");
        setSuccess(true);
        
        localStorage.setItem("accessToken", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", userName);
        localStorage.setItem('role',userRole);
        localStorage.setItem('hotel',hotelId)
        localStorage.setItem('hotelName',res.user.hotel.hotelName)

      })
      .catch(function (error) {
        console.log(error);
      });
  };
  if (!token) {
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
           // backgroundColor: color.YELLLOW_COLOR,
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
          <h2 className="en">The Hotel Management System</h2>
          {/**form */}
          <Stack direction="column">
            <label>ຊື່ຜູ້ໃຊ້</label>

            <TextField
              onChange={(e) => setUser(e.target.value)}
              id="username"
              placeholder=""
              size="small"
              sx={{ ...textStyle }}
            />
            <br />
            <label>ລະຫັດຜ່ານ</label>
            <TextField
              onChange={(e) => setPwd(e.target.value)}
              id="password"
              placeholder=""
              size="small"
              sx={{ ...textStyle }}
            />
            <br />
            {/**login button */}
            <Stack justifyContent="center">
              <Button
                color="primary"
                sx={{ ...btnStyle }}
                variant="contained"
                onClick={() => {
                  handleLogin();
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
  if(success) {
    setSuccess(false)
    return <Navigate to={`${router.DASHBOARD}`} replace />;
  }
 
  return <Navigate to={`${router.DASHBOARD}`} replace />;
}

export default Login;
