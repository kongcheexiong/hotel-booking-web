import { Button, Divider, Stack, TextField } from "@mui/material";
import { borderRadius, fontSize, height, width } from "@mui/system";
import * as react from "react";
import { useNavigate, Navigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import axios from "axios";

// auth
import { authContext, authInitialValue } from "../../context/authContext";
import { font, router } from "../../constants/index.js";

//connstant
import { color } from "../../constants/index.js";
import { textStyle, btnStyle } from "../../style";
import { SERVER_URL } from "../../constants/index.js";

//logo

function AdminLogin(props) {
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
  const [loading, setLoading] = react.useState(false);

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
    

    localStorage.setItem("role", "SYSTEM");
    localStorage.setItem("adminToken", "SYSTEM");
    navigate(`${router.ADMIN_DASHBOARD}`)
  };
  if (!token) {
    return (
      <>
        <AppBar position="fixed" color="inherit">
          <Toolbar>
            <Stack
            direction = 'row'
            spacing= {1}
            sx={{
                flexGrow: 1
            }
            }
            >
              <Typography color="blue" variant="h6" component="div">
                BanHao Booking Hotel Platform
              </Typography>
              
              <Divider orientation="vertical" flexItem />
              <Typography color="blue" variant="h6" component="div" sx={{
                fontFamily: `${font.LAO_FONT}`
              }}>
               ລະບົບຄວບຄຸມໂຮງແຮມ ແລະ ລູກຄ້າ 
              </Typography>
            </Stack>

           

            <Stack direction="row" spacing={2} marginRight="20px">
              <Button
                variant="outlined"
                sx={{ ...btnStyle, "&.MuiButton-root": {
                    fontFamily: `${font.EN_FONT}`
                }}}
                onClick={() => {
                  navigate(`/public`);
                }}
              >
                visit site
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
        <div
          className="login"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",

            backgroundImage: `url(../../nature.jpg)`,

            backgroundSize: "cover",

            flexDirection: "column",
          }}
        >
          <div
            style={{
              // backgroundColor: color.YELLLOW_COLOR,
              //width: "500px",
              marginTop: "100px",
              height: "350px",
              padding: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "300px",
              backgroundColor: "white",
              borderRadius: "15px",
            }}
          >
            {/**company logo */}
            <div>
              <img
                style={{ borderRadius: "20px" }}
                src="../../img.PNG"
                alt="img"
                height={100}
              />
            </div>
            <h2 className="en">BanHao Hotel Booking</h2>
            {/**form */}
            <Stack direction="column">
              <label>Admin</label>

              <TextField
                onChange={(e) => setUser(e.target.value)}
                id="username"
                placeholder=""
                size="small"
                sx={{ ...textStyle }}
              />
              <br />
              <label>Password</label>
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
                  sx={{
                    ...btnStyle,
                    "&.MuiButton-root": {
                      fontFamily: `${font.EN_FONT}`,
                    },
                  }}
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
      </>
    );
  }

  if (loading) {
    return <h1>loading</h1>;

    if (err) {
      return <h1>Error </h1>;
    }

    if (success) {
      setLoading(false);
      setSuccess(false);
      return <Navigate to={`${router.DASHBOARD}`} replace />;
    }
  }

  return <Navigate to={`${router.DASHBOARD}`} replace />;
}

export default AdminLogin;
