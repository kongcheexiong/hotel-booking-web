import { Stack, IconButton, Button, TextField, Alert } from "@mui/material";

import { roomTypeContext } from "../RoomType.context";

import CancelIcon from "@mui/icons-material/Cancel";
import { styled } from "@mui/material";
import * as React from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { router } from "../../../constants";

//import style for override material ui components
import { textStyle, btnStyle } from "../../../style";
import "../style.css";
import { ConstructionOutlined, TurnedIn } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import { SERVER_URL } from "../../../constants";
import {handleUploadImg} from '../../../services/uploadImage/index'
export default function AddRoomType() {
  // const {setRoomType } = React.useContext(roomTypeContext);
  //const roomType = React.useContext(roomTypeContext)
  // console.log(roomType.data)

  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [success,setSuccess] = React.useState(false)

  const hotelId = localStorage.getItem("hotel");
  const initialState = {
    hotel: hotelId,
    typeName: "",
    price: "",
    numberOfBed: "",
    suggestedGuestAllowed: "",
    note: "",
    images: [],
    totalRoom: 0,
    isDeleted: false,
  };
  const initialDeletedData = {
    id: "",
    data: {
      typeName: "",
      price: "",
      numberOfBed: "",
      suggestedGuestAllowed: "",
      note: "",
      images: [],
    },
  };
  const [deletedData, setDeletedData] = React.useState(initialDeletedData);

  const [data, setData] = React.useState(initialState);
  const [files, setFiles] = React.useState("");
  const accessToken = localStorage.getItem("accessToken");
  //func for upload image


  // func for upload roomtype info
  const handleSubmit = async() => {
    setLoading(true)
    let config = {
      method: "post",
      url: `${SERVER_URL}/api/create/room-type`,
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
        setLoading(false)
        setSuccess(true)

      //  console.log('submited')
      })
      .catch(function (error) {
        console.log(error);
       // console.log('error')
       setSuccess(false)
       setLoading(false)
        setErr(true);
      });
  };

  const navigate = useNavigate();
  //*//********* */

  return (
    <div>
      {/**form header */}
      <Stack
        sx={{ backgroundColor: "#1565C0", padding: "0px 10px", color: "white" }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <h3>ເພີ່ມປະເພດຫ້ອງ</h3>
        <IconButton
          onClick={() =>
            navigate(`${router.ROOMTYPEMANAGEMENT}`, { replace: "true" })
          }
        >
          <CancelIcon fontSize="large" color="" />
        </IconButton>
      </Stack>
      <hr />
      {/**form area */}
      <Stack direction="column" spacing={1}>
        {/**
         *  <Stack>
          <label id="id">ລະຫັດປະເພດຫ້ອງ</label>
          <TextField sx={{ ...textStyle, width: "100%" }} />
        </Stack>
         */}

        <Stack>
          <label id="room">ຫ້ອງ</label>
          <TextField
            onChange={(e) => {
              setData({ ...data, typeName: e.target.value });
            }}
            sx={{ ...textStyle, width: "100%" }}
          />
        </Stack>
        <Stack>
          <label id="note">ໝາຍເຫດ</label>
          <TextField
            onChange={(e) => {
              setData({ ...data, note: e.target.value });
            }}
            sx={{ ...textStyle, width: "100%" }}
          />
        </Stack>
        <Stack>
          <label id="price">ລາຄາ</label>
          <TextField
            onChange={(e) => {
              setData({ ...data, price: e.target.value });
            }}
            sx={{ ...textStyle, width: "100%" }}
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <Stack direction="column">
            <label id="nomOfBed">ຈໍານວນຕຽງ</label>
            <TextField
              onChange={(e) => {
                setData({ ...data, numberOfBed: e.target.value });
              }}
              sx={{ ...textStyle }}
            />
          </Stack>

          <Stack direction="column">
            <label id="nomOfQuest">ຈໍານວນລູກຄ້າແນະນໍາ</label>
            <TextField
              onChange={(e) => {
                setData({ ...data, suggestedGuestAllowed: e.target.value });
              }}
              sx={{ ...textStyle }}
            />
          </Stack>
        </Stack>

        <span>ເພີ່ມຮູບພາບປະກອບ</span>
        <Stack>
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
              //console.log(file)
              //const frmdata = new FormData();
              const fileImage = [];
              for (var x = 0; x < file.length; x++) {
                //  frmdata.append("file", file[x]);
                fileImage.push(file[x].name);
              }
              setData({ ...data, images: fileImage });
            }}
          />
          <br/>
          
              {err ? <Alert severity="error">This is an error alert — check it out!</Alert> : null}
              {loading ? <CircularProgress /> : null}
              {success? <Alert severity="success">This is a success alert — check it out!</Alert> : null}
        </Stack>
      </Stack>
      {/**submit button */}
      <Stack sx={{ marginTop: "50px" }} direction="row" justifyContent="">
        <Button
          onClick={async () => {
            //console.log(data)
            await setLoading(true);
            await setErr(false)
            await handleUploadImg(files);
            await handleSubmit();
            
            

            //await navigate(`${router.ROOMTYPEMANAGEMENT}`,{replace:true})
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
