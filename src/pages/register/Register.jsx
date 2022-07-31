import { Button, Stack, TextField } from "@mui/material";
import { borderRadius, fontSize, height, width } from "@mui/system";
import * as react from "react";
import { useNavigate, Navigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import axios from "axios";

import { registerContext } from "../../context/register.context.jsx";

import { font, router } from "../../constants/index.js";

//connstant
import { color } from "../../constants/index.js";
import { textStyle, btnStyle } from "../../style.js";

//logo

function Register(props) {
  const navigate = useNavigate();

  const [userName, setUserName] = react.useState("");
  //const [password, setPassword] = react.useState("asd");
  //const [confirm, setConfirm] = react.useState("asd");
  const [email, setEmail] = react.useState("");

  const { registerInfo, setRegisterInfo } = react.useContext(registerContext);

  return (
    <>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <Typography
            color="blue"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => {
              navigate(`/public`);
            }}
          >
            BanHao Booking Platform
          </Typography>
          <h3
            style={{
              fontWeight: "300",
              color: "#1976d2",
              marginRight: "10px",
            }}
          ></h3>

          <Stack direction="row" spacing={2} marginRight="20px">
            <Button
              variant="outlined"
              sx={{ ...btnStyle }}
              onClick={() => {
                navigate(`/`);
              }}
            >
              ເຂົ້າສູ່ລະບົບ
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
            marginTop: "100px",
            height: "400px",
            padding: "0px 0px",
            display: "flex",
            justifyContent: "flex-start",

            flexDirection: "row",
            Width: "60%",
            backgroundColor: "white",
            borderRadius: "15px",
          }}
        >
          {/** logo and name of company */}
          <div
            style={{
              height: "auto",
              paddingTop: "50px",
              paddingLeft: "50px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingRight: "50px",
              borderTopLeftRadius: "15px",
              borderBottomLeftRadius: "15px",

              borderRight: "1px solid rgb(214, 212, 212)",
              backgroundColor: "#FCFCFC",
            }}
          >
            <div>
              <img
                style={{ borderRadius: "20px" }}
                src="../../img.PNG"
                alt="img"
                height={100}
              />
            </div>
            <h2 className="en">BanHao Booking Platform</h2>
          </div>

          <Stack
            spacing={4}
            direction="column"
            sx={{
              paddingTop: "50px",
              paddingLeft: "50px",
              paddingRight: "50px",
              width: "auto",
            }}
          >
            {/**header */}
            <div
              style={{
                fontSize: "20px",
                fontWeight: "700",
              }}
            >
              ແບບຟອມລົງທະບຽນເຈົ້າຂອງໂຮງແຮມ
            </div>
            {/**form */}
            <Stack spacing={2} direction="column">
              <Stack>
                <label>ຊື່ຜູ້ໃຊ້</label>
                <TextField
                  onChange={(e) => {
                    e.preventDefault();
                    setUserName(e.target.value);
                    //  setRegisterInfo({...registerInfo, userName: e.target.value})
                    setRegisterInfo({
                      ...registerInfo,
                      userName: e.target.value,
                    });
                  }}
                  id="username"
                  placeholder=""
                  size="small"
                  sx={{ ...textStyle, width: "100%" }}
                />
              </Stack>
              <Stack>
                <label>Email</label>
                <TextField
                  onChange={(e) => {
                    e.preventDefault();
                    setEmail(e.target.value);
                    setRegisterInfo({
                      ...registerInfo,

                      email: e.target.value,
                    });
                    // setRegisterInfo({...registerInfo, email: e.target.value})
                  }}
                  id="username"
                  placeholder=""
                  size="small"
                  sx={{ ...textStyle }}
                />
              </Stack>

              {/**login button */}
            </Stack>
            <Stack>
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
                  //  navigate(`${router.REGISTER}/info`, { replace: true });
                  if (!email || !userName) {
                    alert("fill");
                  } else {
                    navigator.geolocation.getCurrentPosition((pos) => {
                      setRegisterInfo({
                        ...registerInfo,
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                      });
                      console.log(registerInfo);

                      // console.log(marker);
                    });

                    //console.log(registerInfo);
                    navigate(`${router.REGISTER}/info`, { replace: true });
                  }
                }}
              >
                Next >
              </Button>
            </Stack>
          </Stack>
        </div>
      </div>
    </>
  );
}

export default Register;
