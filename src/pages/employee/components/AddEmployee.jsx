import {
  Stack,
  IconButton,
  Button,
  TextField,
  Alert,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import { SERVER_URL } from "../../../constants";
///import { roomTypeContext } from "../RoomType.context";

import CancelIcon from "@mui/icons-material/Cancel";
import { styled } from "@mui/material";
import * as React from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { router } from "../../../constants";

//import style for override material ui components
import { textStyle, btnStyle, datetimeStyle } from "../../../style";

import { ConstructionOutlined, TurnedIn } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import { handleUploadImg } from "../../../services/uploadImage/index";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "../style.css";
import { borderRadius } from "@mui/system";

import {font} from '../../../constants/index'
import { MobileDatePicker } from "@mui/x-date-pickers";

export default function AddEmployee() {
  const navigate = useNavigate();
  const hotelID = localStorage.getItem("hotel");

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [err, setErr] = React.useState(false);

  const [data, setData] = React.useState({
    hotel: hotelID,
    userName: "",
    password: "",
    role: "",
    firstName: "",
    lastName: "",
    gender: "",
    birthday: "",
    village: "",
    city: "",
    province: "",
    image: "",
    phone: "",
    detail: "",
  });
  const [files, setFiles] = React.useState();
  const accessToken = localStorage.getItem("accessToken");

  const [date, setDate] = React.useState("");

  // func for upload roomtype info
  const handleSubmit = async () => {
    setLoading(true);
    let config = {
      method: "post",
      url: `${SERVER_URL}/api/create/user`,
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
      timeout: 5000,
    };
    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setLoading(false);
        setSuccess(true);
        

        //  console.log('submited')
      })
      .catch(function (error) {
        console.log(error);
        // console.log('error')
        alert('Please fill out the form properly')
        setSuccess(false);
        setLoading(false);
        setErr(true);
      });
  };

  return (
    <div>
      {/**form header */}
      <Stack
        sx={{ backgroundColor: "#1565C0", padding: "0px 10px", color: "white" }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <h3>ຈັດການຂໍ້ມູນພະນັກງານ</h3>
        <IconButton
          onClick={() =>
            navigate(`${router.EMPLOYEEMANAGEMENT}`, { replace: "true" })
          }
        >
          <CancelIcon fontSize="large" color="" />
        </IconButton>
      </Stack>
      
      
      {/**form area */}
      <h3>ລົງທະບຽນ</h3>

      <Stack direction="column" spacing={1}>
        <div
          style={{
            display: "flex",
            flexDirection: 'column'
            //gridTemplateColumns: "auto auto auto",
            //columnGap: "30px",
          }}
        >
          <Stack width="100%">
            <label id="userName">User name</label>
            <TextField
              onChange={(e) => {
                setData({ ...data, userName: e.target.value });
              }}
              sx={{ ...textStyle, width: "100%" }}
            />
          </Stack>
          <Stack width="100%">
            <label id="password">Password</label>
            <TextField
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
              sx={{ ...textStyle, width: "100%" }}
            />
          </Stack>
          <Stack width="100%">
            <label id="role">Role</label>
            <Select
              sx={{ ...textStyle, height: 35, width: "100%" }}
              value={data.role}
              onChange={(e) => {
                setData({ ...data, role: e.target.value });
              }}
            >
              <MenuItem value="ADMIN">Admin</MenuItem>
              <MenuItem value="STAFF">Staff</MenuItem>
            </Select>
          </Stack>
        </div>
        <br />
        {/**detail info */}
        <h3>ລາຍລະອຽດຜູ້ໃຊ້</h3>
        <div
          style={{
            display: "flex",
           // gridTemplateColumns: "auto auto auto",
           // columnGap: "30px",
           flexDirection: 'column'
          }}
        >
           <Stack width="100%">
            <label id=""gender>ເພດ</label>
            <Select

              sx={{ ...textStyle, fontFamily: `${font.LAO_FONT}`, height: 35, width: "100%" }}
              value={data.gender}
              onChange={(e) => {
                setData({ ...data, gender: e.target.value });
              }}
            >
              <MenuItem sx={{fontFamily: `${font.LAO_FONT}`}} value="MALE">ຊາຍ</MenuItem>
              <MenuItem sx={{fontFamily: `${font.LAO_FONT}`}}  value="FEMALE">ຍິງ</MenuItem>
            </Select>
          </Stack>
          <Stack sx={{ width: "100%" }}>
            <label id="firstName">ຊື່</label>
            <TextField
              onChange={(e) => {
                setData({ ...data, firstName: e.target.value });
              }}
              sx={{ ...textStyle, width: "100%" }}
            />
          </Stack>
          <Stack sx={{ width: "100%" }}>
            <label id="lastName">ນາມສະກຸນ</label>
            <TextField
              onChange={(e) => {
                setData({ ...data, lastName: e.target.value });
              }}
              sx={{ ...textStyle, width: "100%" }}
            />
          </Stack>
          <Stack>
            <Stack>
              <label id="dateOfBirth">ວັນເດືອນປີເກີດ</label>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  inputFormat = 'dd/MM/yyyy'
                  value={date}
                  onChange={(value) => {
                    const _date = new Date(value);
                    console.log(_date.toLocaleDateString("en-GB"));
                    const saveDate = _date.toLocaleDateString("en-GB")
                    setDate(value);
                    setData({
                      ...data,
                      birthday: value,
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      onChange={(e) =>
                        setData({
                          ...data,
                          birthday: e.target.value,
                        })
                      }
                      sx={{ ...textStyle, width: "100%" }}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </Stack>
          </Stack>

          <Stack width="100%">
            <label id="village">ບ້ານ</label>
            <TextField
              onChange={(e) => {
                setData({ ...data, village: e.target.value });
              }}
              sx={{ ...textStyle, width: "100%" }}
            />
          </Stack>
          <Stack width="100%">
            <label id="city">ເມືອງ</label>
            <TextField
              onChange={(e) => {
                setData({ ...data, city: e.target.value });
              }}
              sx={{ ...textStyle, width: "100%" }}
            />
          </Stack>

          <Stack width="100%">
            <label id="province">ແຂວງ</label>
            <TextField
              onChange={(e) => {
                setData({ ...data, province: e.target.value });
              }}
              sx={{ ...textStyle, width: "100%" }}
            />
          </Stack>

          <Stack>
            <label id="phone">ເບີໂທລະສັບ</label>
            <TextField
              onChange={(e) => {
                setData({ ...data, phone: e.target.value });
              }}
              sx={{ ...textStyle, width: "100%" }}
            />
          </Stack>
          <Stack>
            <label id="detail">ໝາຍເຫດ</label>
            <TextField
              onChange={(e) => {
                setData({ ...data, detail: e.target.value });
              }}
              sx={{ ...textStyle, width: "100%" }}
            />
          </Stack>
        </div>

        <span>ເພີ່ມຮູບພາບປະກອບ</span>
        <Stack>
          <input
            accept="image/png, image/gif, image/jpeg"
            style={{ width: "200px" }}
            name="filefield"
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
              setData({ ...data, image: fileImage[0] });
            }}
          />
          <br />

          {err ? (
            <Alert severity="error">
              This is an error alert — check it out!
            </Alert>
          ) : null}
          {loading ? <CircularProgress /> : null}
          {success ? (
            <Alert severity="success">
              This is a success alert — check it out!
            </Alert>
          ) : null}
        </Stack>
      </Stack>
      {/**submit button */}
      <Stack sx={{ marginTop: "50px" }} direction="row" justifyContent="">
        <Button
          onClick={async () => {
           // console.log(data)
           setLoading(true);
           setErr(false);
           setSuccess(false)
           await handleSubmit();
           await handleUploadImg(files)
           console.log(data);
          }}
          variant="contained"
          sx={{ ...btnStyle }}
        >
          ຕົກລົງ
        </Button>
      </Stack>
    </div>
  );
}
