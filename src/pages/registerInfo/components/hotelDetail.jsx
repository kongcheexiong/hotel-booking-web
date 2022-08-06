import React from "react";
import axios from "axios";

import Map from "./map";
import { Navigate, useNavigate } from "react-router-dom";
import { color, font } from "../../../constants";
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

import { registerContext } from "../../../context/register.context";

import { btnStyle, textStyle, selectStyle } from "../../../style";
import laoInfo from "../../../../lao.json";
import { MusicNoteOutlined } from "@mui/icons-material";
import { Box } from "@mui/system";

import { handleUploadImg } from "../../../services/uploadImage";
import { SERVER_URL } from "../../../constants";
import { router } from "../../../constants";

import { RegisterProgressContext } from "../../../context/registerProgress.context";
import MyRouter from "../../../routes";

const SuccessRegister = ()=>{

  return(
    <div style={{
      width: '500px',
      height: '600px',
      display:'flex',
      flexDirection: 'column',
      rowGap: '20px'}}>
         <h3> ສໍາເລັດການລົງທະບຽນຂໍ້ມູນ, ກາລຸນາລໍຖ້າການຢືນຢັນຈາກລະບົບ</h3>
          
          </div>
  )
}

export default function HotelDetail() {
  const { RegisterProgress, setRegisterProgress } = React.useContext(
    RegisterProgressContext
  );
  const navigate = useNavigate();

  const { registerInfo, setRegisterInfo } = React.useContext(registerContext);
  const [province, setProvince] = React.useState([]);
  const [district, setDistrict] = React.useState([]);
  const [village, setVillage] = React.useState([]);
  const [update, setUpdate] = React.useState(0);
  const [files, setFiles] = React.useState("");
  const [hotelName, setHotelName] = React.useState("");

  //const [finish, setFinish] = React.useState(0)
  const registerHotel = async () => {
    var data = JSON.stringify({
      hotelName: registerInfo.hotelName,
      images: registerInfo.images,
      province: registerInfo.province,
      city: registerInfo.district,
      village: registerInfo.village,
      lat: registerInfo.lat,
      lng: registerInfo.lng,
      phone:  registerInfo.phone,
      email:  registerInfo.email,
    });

    var config = {
      method: "post",
      url: `${SERVER_URL}/api/create/hotel`,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 40000,
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
            role: "OWNER",
            firstName: registerInfo.firstName,
            lastName: registerInfo.lastName,
      
            birthday: registerInfo.birthday,

            image:  registerInfo.UserImages,
          })
          .then((res) => {
           // handleUploadImg(files);
            console.log(res.data);
            alert("create success");
          })
          .catch((err) => console.error(err));
      })
      .catch(function (error) {
        console.log(error);
      });
  };



  return (
    <Stack direction='column' spacing = {2}>
      <Stack direction='column' spacing={1}>
        <h1>ລາຍລະອຽດໂຮງແຮມ</h1>
        <Stack spacing={0}>
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
        <Stack spacing={0}>
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
              setDistrict(value.districts);
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
        <Stack spacing={0}>
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
              setVillage(value.villages);
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
        <Stack spacing={0}>
          <label>ບ້ານ</label>
          <Autocomplete
            // value={`${registerInfo.village}`}

            disabled={registerInfo.district ? false : true}
            size="small"
            disablePortal
            id="combo-box-demo"
            onChange={(event, value) => {
              setRegisterInfo({
                ...registerInfo,
                village: value.vill_name,
              });
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
       
        <Stack spacing={0}>
          <label>ອັບໂຫລດຮູບພາບໂຮງແຮມ (ສາມາດເລືອກໄດ້ຫຼາຍກວ່າ 1 ຮູບ)</label>
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
        <div>
          <label>ເພີ່ມແຜນທີ່</label>
          <Map />
        </div>
      </Stack>

      <Button
        onClick={async () => {
          await registerHotel();
          await handleUploadImg(files)
          setRegisterProgress(2);
          console.log(registerInfo)
          navigate(`${router.REGISTER}/hotel/success`)
          
        }}
        
        variant="contained"
        sx={{ ...btnStyle}}
      >
        ສໍາເລັດ
      </Button>
    </Stack>
  );
}
