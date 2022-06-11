import { Button, Stack, TextField } from "@mui/material";
import { borderRadius, fontSize, height, width } from "@mui/system";
import * as react from "react";
import { useNavigate, Navigate } from "react-router-dom";

import axios from "axios";

import { registerContext } from "../../context/register.context.jsx";

import { router } from "../../constants/index.js";

//connstant
import { color } from "../../constants/index.js";
import { textStyle } from "../../style.js";

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

function Register(props) {
  const navigate = useNavigate();

  const [userName, setUserName] = react.useState("");
  const [password, setPassword] = react.useState("");
  const [confirm, setConfirm] = react.useState("");

  const { registerInfo, setRegisterInfo } = react.useContext(registerContext);

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
          //backgroundColor: color.YELLLOW_COLOR,
          width: "500px",
          height: "100%",
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
        <h2 className="lao">ລົງທະບຽນເຂົ້າໃຊ້ລະບົບຈັດການໂຮງແຮມ</h2>
        {/**form */}
        <Stack direction="column">
          <label>ຊື່ຜູ້ໃຊ້</label>

          <TextField
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            id="username"
            placeholder=""
            size="small"
            sx={{ ...textStyle }}
          />
          <br />
          <label>ລະຫັດຜ່ານ</label>
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="password"
            placeholder=""
            size="small"
            sx={{ ...textStyle }}
          />
          <br />
          <label>ຢືນຢັນ</label>
          <TextField
            onChange={(e) => {
              setConfirm(e.target.value);
            }}
            id="confirm"
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
                if (!password || !confirm || !userName) {
                  alert("fill");
                } else {
                  if (password === confirm) {
                    setRegisterInfo({
                      ...registerInfo,
                      userName: userName,
                      password: password,
                    });
                    navigator.geolocation.getCurrentPosition((pos) => {
                      setRegisterInfo({
                        ...registerInfo,
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                      });
                      console.log(registerInfo)

                      // console.log(marker);
                    });

                    //console.log(registerInfo);
                    navigate(`${router.REGISTER}/info`, { replace: true });
                  }
                }
              }}
            >
              Next >
            </Button>
          </Stack>
        </Stack>
      </div>
    </div>
  );
}

export default Register;
