import React from "react";
import Map from "./components/map";
import { Navigate, Outlet } from "react-router-dom";
import { color, font } from "../../constants";
import {
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  Autocomplete,
  Typography,
} from "@mui/material";

import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";

import { registerContext } from "../../context/register.context";

import { btnStyle, textStyle, selectStyle } from "../../style";
import laoInfo from "../../../lao.json";
import { MusicNoteOutlined } from "@mui/icons-material";
import { Box } from "@mui/system";

import { handleUploadImg } from "../../services/uploadImage";
import { SERVER_URL } from "../../constants";
import { router } from "../../constants";

import VerticalStepper from "./components/stepper";

import HotelDetail from "./components/hotelDetail";

import axios from "axios";
export default function RegisterInfo() {
  const { registerInfo, setRegisterInfo } = React.useContext(registerContext);
  const [province, setProvince] = React.useState([]);
  const [district, setDistrict] = React.useState([]);
  const [village, setVillage] = React.useState([]);
  const [update, setUpdate] = React.useState(0);
  const [files, setFiles] = React.useState("");
  const [hotelName, setHotelName] = React.useState("");

  const [finish, setFinish] = React.useState(0);

  const registerUser = async () => {
    var data = JSON.stringify({
      hotel: hotelName,
      userName: registerInfo.userName,
      password: registerInfo.password,
      role: "OWNER",
    });

    var config = {
      method: "post",
      url: `${SERVER_URL}/api/create/user`,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 5000,
      data: data,
    };

    await axios(config)
      .then(function (response) {
        console.log(response.data);
        alert("create success");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const registerHotel = async () => {
    var data = JSON.stringify({
      hotelName: registerInfo.hotelName,
      images: registerInfo.images,
      province: registerInfo.province,
      city: registerInfo.district,
      village: registerInfo.village,
      lat: registerInfo.lat,
      lng: registerInfo.lng,

      note: registerInfo.note,
      phone: "",
      email: "",
    });

    var config = {
      method: "post",
      url: `${SERVER_URL}/api/create/hotel`,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 5000,
      data: data,
    };

    await axios(config)
      .then(function (response) {
        console.log(response.data);
        // setHotelName(response.data._id)
        console.log(response.data._id);
        return response.data._id;
      })
      .then((hotelID) => {
        axios
          .post(`${SERVER_URL}/api/create/user`, {
            hotel: hotelID,
            userName: registerInfo.userName,
            password: registerInfo.password,
            role: "OWNER",
            firstName: "",
            lastName: "",
            gender: "",
            birthday: "",
            village: "",
            city: "",
            province: "",
            image: "",
            phone: "",
          })
          .then((res) => {
            handleUploadImg(files);
            console.log(res.data);
            alert("create success");
          })
          .catch((err) => console.error(err));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    //update district
    //setDistrict([])
    if (registerInfo.province) {
      for (let i = 0; i < laoInfo.length; i++) {
        const element = laoInfo[i];
        if (element.pr_name === registerInfo.province) {
          setDistrict(element.districts);
          console.log(district);
          break;
        }
      }
    }
  }, [registerInfo.province]);
  React.useEffect(() => {
    // console.log(district)
    //setVillage([])
    //set villages
    if (registerInfo.district) {
      for (let i = 0; i < district.length; i++) {
        const element = district[i];
        if (element.dr_name === registerInfo.district) {
          setVillage(element.villages);
          //console.log(village);
          break;
        }
      }
    }
  }, [registerInfo.district]);

  return Object.keys(registerInfo).length !== 0 ? (
    <>
      <AppBar elevation={1} position="sticky" color="inherit" disablePortal>
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
        style={{
          position: "fixed",
          padding: "50px 0px 0px 50px",
        }}
      >
        <VerticalStepper finish={finish} />
      </div>

      <Stack
        direction="row"
        justifyContent="center"
        // sx={{ paddingBottom: "50px" }}
      >
        <div
          style={{
            borderLeft: "1px solid rgb(214, 212, 212)",
            borderRight: "1px solid rgb(214, 212, 212)",
            backgroundColor: "#FCFCFC",

            padding: "20px 60px",
            display: "flex",
            flexDirection: "column",
            rowGap: "20px",
          }}
        >
          {/**user info */}

          {/**hotel info */}
          <Outlet />
        </div>
      </Stack>
    </>
  ) : (
    <Navigate to={`${router.REGISTER}`} replace />
  );
}
