import React from "react";
import Map from "./components/map";
import { Navigate } from "react-router-dom";
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
import { registerContext } from "../../context/register.context";

import { btnStyle, textStyle, selectStyle } from "../../style";
import laoInfo from "../../../lao.json";
import { MusicNoteOutlined } from "@mui/icons-material";
import { Box } from "@mui/system";

import { handleUploadImg } from "../../services/uploadImage";
import { SERVER_URL } from "../../constants";
import { router } from "../../constants";

import axios from "axios";
export default function RegisterInfo() {
  const { registerInfo, setRegisterInfo } = React.useContext(registerContext);
  const [province, setProvince] = React.useState([]);
  const [district, setDistrict] = React.useState([]);
  const [village, setVillage] = React.useState([]);
  const [update, setUpdate] = React.useState(0);
  const [files, setFiles] = React.useState("");
  const [hotelName, setHotelName] = React.useState("");

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
      isDeleted: false,
      note: registerInfo.note,
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
          })
          .then((res) => {
            handleUploadImg(files)
            console.log(res.data)
            alert('create success')
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
    <Stack
      direction="row"
      justifyContent="center"
      sx={{ marginBottom: "50px" }}
    >
      <div>
        <h3>ລາຍລະອຽດໂຮງແຮມ</h3>
        <Stack spacing={1}>
          <label>ຊື່ໂຮງແຮມ</label>
          <TextField
            // placeholder="adf"
            //defaultValue={registerInfo.userName}
            sx={{ ...textStyle, width: "100%" }}
            onChange={(e) => {
              setRegisterInfo({ ...registerInfo, hotelName: e.target.value });
            }}
          />
        </Stack>
        <div
          style={{
            padding: "10px 0px 20px 0px",
            width: "500px",
            rowGap: "10px",

            display: "flex",
            flexDirection: "column",
            //gridTemplateColumns: "auto auto",
          }}
        >
          <Stack spacing={1}>
            <label>ແຂວງ</label>
            <Autocomplete
              //value={`${registerInfo.province}`}
              size="small"
              disablePortal
              id="combo-box-demo"
              onChange={(event, value) => {
                setRegisterInfo({
                  ...registerInfo,
                  province: value.pr_name,
                  district: "",
                  village: "",
                });
              }}
              renderOption={(props, option) => (
                <Box
                  style={{ fontSize: 14, fontFamily: `${font.LAO_FONT}` }}
                  {...props}
                >
                  {option.pr_name}
                </Box>
              )}
              options={laoInfo}
              getOptionLabel={(option) => option.pr_name}
              sx={{
                "&.MuiAutocomplete-root": {
                  fontFamily: `${font.LAO_FONT}`,
                  fontSize: "14px",
                },
              }}
              renderInput={(params) => (
                <TextField sx={{ ...textStyle, width: "100%" }} {...params} />
              )}
            />
          </Stack>
          <Stack spacing={1}>
            <label>ເມືອງ</label>
            <Autocomplete
              //value={`${registerInfo.district}`}

              disabled={registerInfo.province ? false : true}
              size="small"
              disablePortal
              id="combo-box-demo"
              onChange={(event, value) => {
                setRegisterInfo({
                  ...registerInfo,
                  district: value.dr_name,
                  village: "",
                });
              }}
              renderOption={(props, option) => (
                <Box
                  style={{ fontSize: 14, fontFamily: `${font.LAO_FONT}` }}
                  {...props}
                >
                  {option.dr_name}
                </Box>
              )}
              options={district}
              getOptionLabel={(option) => option.dr_name}
              sx={{
                "&.MuiAutocomplete-root": {
                  fontFamily: `${font.LAO_FONT}`,
                  fontSize: "14px",
                },
              }}
              renderInput={(params) => (
                <TextField sx={{ ...textStyle, width: "100%" }} {...params} />
              )}
            />
          </Stack>
          <Stack spacing={1}>
            <label>ບ້ານ</label>
            <Autocomplete
              // value={`${registerInfo.village}`}

              disabled={registerInfo.district ? false : true}
              size="small"
              disablePortal
              id="combo-box-demo"
              onChange={(event, value) => {
                setRegisterInfo({ ...registerInfo, village: value.vill_name });
              }}
              renderOption={(props, option) => (
                <Box
                  style={{ fontSize: 14, fontFamily: `${font.LAO_FONT}` }}
                  {...props}
                >
                  {option.vill_name}
                </Box>
              )}
              options={village}
              getOptionLabel={(option) => option.vill_name}
              sx={{
                "&.MuiAutocomplete-root": {
                  fontFamily: `${font.LAO_FONT}`,
                  fontSize: "14px",
                },
              }}
              renderInput={(params) => (
                <TextField sx={{ ...textStyle, width: "100%" }} {...params} />
              )}
            />
          </Stack>
          <Stack spacing={1}>
            <label>ເພີ່ມລາຍລະອຽດອຶ່ນໆ</label>
            <TextField
              //placeholder="adf"
              //defaultValue={registerInfo.password}
              sx={{ ...textStyle, width: "100%" }}
              onChange={(e) => {
                setRegisterInfo({ ...registerInfo, note: e.target.value });
              }}
            />
          </Stack>
          <Stack spacing={1}>
            <label>ເພີ່ມຮູບພາບໂຮງແຮມ</label>
            <input
              accept="image/png, image/gif, image/jpeg"
              style={{ width: "200px" }}
              name="filefield"
              multiple="multiple"
              type="file"
              onChange={(event) => {
                event.preventDefault();
                const file = event.target.files;
                setFiles(file);
                //const frmdata = new FormData();
                const fileImage = [];
                for (var x = 0; x < file.length; x++) {
                  //  frmdata.append("file", file[x]);
                  fileImage.push(file[x].name);
                }
                //setData({ ...data, images: fileImage });
                setRegisterInfo({ ...registerInfo, images: fileImage });
              }}
            />
          </Stack>
        </div>
        <div>
          <label>ເພີ່ມແຜນທີ່</label>
          <Map />
        </div>
        <br />
        <Button
          onClick={async () => {
            
            await registerHotel();
            //await handleUploadImg(files)
           
            
          }}
          variant="contained"
          sx={{ ...btnStyle }}
        >
          ສໍາເລັດ
        </Button>
      </div>
    </Stack>
  ) : (
    <Navigate to={`${router.REGISTER}`} replace />
  );
}
