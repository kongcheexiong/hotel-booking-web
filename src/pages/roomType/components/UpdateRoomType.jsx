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

import { counterContext } from "../../../context/counter";
import {SERVER_URL} from '../../../constants/index'
export default function UpdateRoomType(props) {
  // const {setRoomType } = React.useContext(roomTypeContext);
  //const roomType = React.useContext(roomTypeContext)
  // console.log(roomType.data)
  const { value, setValue } = React.useContext(counterContext);

  const { updatedData } = props;

  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [success, setSuccess] = React.useState(false)

  const hotelId = localStorage.getItem("hotel");
  console.log(updatedData);
  const initialState = {
    id: updatedData._id,
    data: {
      typeName: updatedData.typeName,
      price: updatedData.price,
      numberOfBed: updatedData.numberOfBed,
      suggestedGuestAllowed: updatedData.suggestedGuestAllowed,
      note: updatedData.note,
      images: [],
    },
  };

  const [data, setData] = React.useState(initialState);

  const [files, setFiles] = React.useState("");
  const accessToken = localStorage.getItem("accessToken");
  //func for upload image
  const handleUploadImg = async () => {
    setLoading(true);
    let data = new FormData();

    for (const i of Object.keys(files)) {
      data.append("file", files[i]);
    }

    var config = {
      method: "post",
      url: `${SERVER_URL}/api/upload/images`,
      data: data,
      timeout: 40000,
    };

    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
        setErr(true);
      });
  };

  // func for upload roomtype info
  const handleSubmit = async () => {
    setLoading(true);
    let config = {
      method: "put",
      url: `${SERVER_URL}/api/update/room-type`,
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
      timeout: 40000,
    };
    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setValue(() => value + 1);
        setSuccess(true)
        //console.log('submited')
      })
      .catch(function (error) {
        console.log(error);
        //console.log('error')
        setErr(true);
      });
  };
  const [deletedId,setDeleltedId] = React.useState('')

  const handleDelete = async () => {
    let config = {
      method: "delete",
      url: `${SERVER_URL}/api/delete/room-type`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        id: "",
      },
      timeout: 40000
    };

    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
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
        <h3>??????????????????????????????????????????</h3>
        {/**
         * <IconButton onClick={() => {}}>
          <CancelIcon fontSize="large" color="" />
        </IconButton>
         * 
         */}
      </Stack>
      <hr />
      {/**form area */}
      <Stack direction="column" spacing={1}>
        <Stack>
          <label id="room">????????????</label>
          <TextField
            defaultValue={updatedData.typeName}
            onChange={(e) => {
              setData({
                ...data,
                data: {
                  ...data.data,
                  typeName: e.target.value,
                },
              });
            }}
            sx={{ ...textStyle, width: "100%" }}
          />
        </Stack>
        <Stack>
          <label id="note">??????????????????</label>
          <TextField
            defaultValue={updatedData.note}
            onChange={(e) => {
              setData({
                ...data,
                data: {
                  ...data.data,
                  note: e.target.value,
                },
              });
            }}
            sx={{ ...textStyle, width: "100%" }}
          />
        </Stack>
        <Stack>
          <label id="price">????????????</label>
          <TextField
            defaultValue={updatedData.price}
            onChange={(e) => {
              setData({
                ...data,
                data: {
                  ...data.data,
                  price: e.target.value,
                },
              });
            }}
            sx={{ ...textStyle, width: "100%" }}
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <Stack direction="column">
            <label id="nomOfBed">???????????????????????????</label>
            <TextField
              defaultValue={updatedData.numberOfBed}
              onChange={(e) => {
                setData({
                  ...data,
                  data: {
                    ...data.data,
                    numberOfBed: e.target.value,
                  },
                });
              }}
              sx={{ ...textStyle, width: "100%" }}
            />
          </Stack>

          <Stack direction="column">
            <label id="nomOfQuest">??????????????????????????????????????????????????????</label>
            <TextField
              defaultValue={updatedData.suggestedGuestAllowed}
              onChange={(e) => {
                setData({
                  ...data,
                  data: {
                    ...data.data,
                    suggestedGuestAllowed: e.target.value,
                  },
                });
              }}
              sx={{ ...textStyle, width: "100%" }}
            />
          </Stack>
        </Stack>

        <span>?????????????????????????????????</span>
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
              //const frmdata = new FormData();
              const fileImage = [];
              for (var x = 0; x < file.length; x++) {
                //  frmdata.append("file", file[x]);
                fileImage.push(file[x].name);
              }
              setData({
                ...data,
                data: {
                  ...data.data,
                  images: fileImage,
                },
              });
            }}
          />
          {loading ? <CircularProgress /> : null}
          {err ? <h1>Something went wrongor reload and try again</h1> : null}
          {success && <Alert severity="success">This is a success alert ??? check it out!</Alert>}
        </Stack>
      </Stack>
      {/**submit button */}
      <Stack sx={{ marginTop: "50px" }} direction="row" justifyContent="">
        <Button
          onClick={async () => {
            console.log(data);
            setLoading(true);
            await handleUploadImg();
            await handleSubmit();
            setErr(false);
            setLoading(false);

            //await navigate(`${router.ROOMTYPEMANAGEMENT}`,{replace:true})
          }}
          variant="contained"
          sx={{ ...btnStyle }}
        >
          ??????????????????
        </Button>
      </Stack>
    </div>
  );
}
