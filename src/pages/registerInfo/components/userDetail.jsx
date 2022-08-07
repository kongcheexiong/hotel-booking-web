import React from "react";

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

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers";

export default function UserDetail() {
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
  const [loading, setLoading] = React.useState(false);


  const [date, setDate] = React.useState("")

  //const [finish, setFinish] = React.useState(0)
  React.useEffect(() => {
    setRegisterProgress(0)

  }, [])

  return (
    <div style={{
      width: '500px',
      height: '600px',
      display: 'flex',
      flexDirection: 'column',
      rowGap: '20px',

    }}
    >
      <Stack spacing={2}>
        <h1>ລາຍລະອຽດເຈົ້າໂຮງແຮມ</h1>
        <Stack spacing={0}>
          <label>ຊື່</label>
          <TextField
            // placeholder="adf"
            //defaultValue={registerInfo.userName}
            sx={{ ...textStyle, width: "100%" }}
            onChange={(e) => {
              setRegisterInfo({ ...registerInfo, firstName: e.target.value });
            }}
          />
        </Stack>
        <Stack spacing={0}>
          <label>ນາມສະກຸນ</label>
          <TextField
            // placeholder="adf"
            //defaultValue={registerInfo.userName}
            sx={{ ...textStyle, width: "100%" }}
            onChange={(e) => {
              setRegisterInfo({ ...registerInfo, lastName: e.target.value });
            }}
          />
        </Stack>
        <Stack>
          <label id="dateOfBirth">ວັນເດືອນປີເກີດ</label>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              inputFormat='dd/MM/yyyy'
              value={date}
              onChange={(value) => {
                const _date = new Date(value);
                console.log(_date.toLocaleDateString("en-GB"));
                const saveDate = _date.toLocaleDateString("en-GB")
                setDate(value);
                //setData({
                //  ...data,
                //  birthday: value,
                //});
                setRegisterInfo({ ...registerInfo, birthday: value });

              }}
              renderInput={(params) => (
                <TextField
                  onChange={(e) => { }
                  }
                  sx={{ ...textStyle, width: "100%" }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        </Stack>
        <Stack spacing={0}>
          <label>ເບີໂທລະສັບຕິດຕໍ່</label>
          <TextField
            // placeholder="adf"
            //defaultValue={registerInfo.userName}
            sx={{ ...textStyle, width: "100%" }}
            onChange={(e) => {
              setRegisterInfo({ ...registerInfo, phone: e.target.value });
            }}
          />
        </Stack>

        <Stack spacing={0}>
          <label>ອັບໂຫລດຮູບພາບເຈົ້າຂອງໂຮງແຮມ</label>
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
              setRegisterInfo({ ...registerInfo, UserImages: fileImage[0] });
            }}
          />
        </Stack>

      </Stack>

      {loading ? <span>Loading...</span> : null}

      <Button
        onClick={async () => {
          //await registerHotel();
          if (loading) return;

          if (registerInfo.UserImages) {
            setLoading(true)
            await handleUploadImg(files)
            setLoading(false);
          }
          console.log(registerInfo)

          setRegisterProgress(1);
          navigate(`${router.REGISTER}/hotel`)
        }}
        variant="contained"
        sx={{ ...btnStyle }}
      >
        next
      </Button>
    </div>
  );
}
