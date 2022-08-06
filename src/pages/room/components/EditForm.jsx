import {
  Stack,
  IconButton,
  Button,
  TextField,
  Alert,
  MenuItem,
  Select,
} from "@mui/material";

import CancelIcon from "@mui/icons-material/Cancel";
import { styled } from "@mui/material";
import * as React from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { router } from "../../../constants";

//import style for override material ui components
import { textStyle, btnStyle } from "../../../style";

import { ConstructionOutlined, TurnedIn } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";

import { counterContext } from "../../../context/counter";
import { SERVER_URL } from "../../../constants";

export default function EditForm(props) {
  // const {setRoomType } = React.useContext(roomTypeContext);
  //const roomType = React.useContext(roomTypeContext)
  // console.log(roomType.data)
  const { value, setValue } = React.useContext(counterContext);

  const { updatedData } = props;

  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const hotelId = localStorage.getItem("hotel");

  const [files, setFiles] = React.useState("");
  const accessToken = localStorage.getItem("accessToken");

  const [type, setType] = React.useState(updatedData?.roomType._id);
  const [name, setName] = React.useState(updatedData?.roomName);
  const [note, setNote] = React.useState(updatedData?.note);

  const [roomTypeData, setRoomTypeData] = React.useState([]);

  const [loadingRoom, setLoadingRoom] = React.useState(false);
  const [successLoadRoom, setSuccessLoadRoom] = React.useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setErr(false);
    setSuccess(false);

    axios
      .put(`${SERVER_URL}/api/update/room`, {
        id: updatedData._id,
        roomName: name,
        roomType: type,
        note: note,
      })
      .then((res) => {
        setLoading(false);
        setSuccess(true);
        setErr(false);
        console.log(res.data);
        setValue((value) => value + 1);
      })
      .catch((err) => {
        setErr(true);
        setLoading(true);
        console.log(err);
      });
  };
  const getRoomtypeData = async () => {
    setLoadingRoom(true);
    await axios
      .get(`${SERVER_URL}/api/room-types/skip/0/limit/30?hotelId=${hotelId}`, {
        timeout: 40000,
      })
      .then((res) => {
        setRoomTypeData(res.data.roomTypes);
        setLoadingRoom(false);

        //setloading(false);
        console.log(roomTypeData);
      })
      .catch((err) => {
        console.error(err);
        // setError(true);
      });
  };

  React.useEffect(() => {
    console.log(updatedData);
    getRoomtypeData();
  }, []);

  return (
    <div>
      {/**form header */}
      <Stack
        sx={{ backgroundColor: "#1565C0", padding: "0px 10px", color: "white" }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <h3>ແກ້ໄຂຂໍ້ມູນຫ້ອງ</h3>
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
          <label id="room">ເບີຫ້ອງ</label>
          <TextField
            defaultValue={updatedData.roomName}
            onChange={(e) => {
              e.preventDefault();
              setName(e.target.value);
            }}
            sx={{ ...textStyle, width: "100%" }}
          />
        </Stack>
        {loadingRoom ? <span>loading...</span> : null}
        <Stack>
          <label>ປະເພດຫ້ອງ</label>
          <Select
            sx={{ ...textStyle, height: 40, width: "100%" }}
            value={type}
            onChange={(e) => {
              e.preventDefault();
              setType(e.target.value);
            }}
          >
            {roomTypeData.map((val) => {
              return (
                <MenuItem key={val.roomType._id} value={val.roomType._id}>
                  {val.roomType.typeName}
                </MenuItem>
              );
            })}
          </Select>
        </Stack>
        <Stack>
          <label id="price">ລາຍລະອຽດ</label>
          <TextField
            defaultValue={updatedData.note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
            sx={{ ...textStyle, width: "100%" }}
          />
        </Stack>
      </Stack>
      {/**submit button */}
      <Stack sx={{ marginTop: "30px" }}>
        {loading ? (
          <span>ແກ້ໄຂ...</span>
        ) : success ? (
          <span>ສໍາເລັດ</span>
        ) : err ? (
          <span>err</span>
        ) : null}
        <Button
          onClick={async () => {
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
