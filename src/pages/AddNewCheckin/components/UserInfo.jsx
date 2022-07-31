import {
  Avatar,
  Stack,
  Select,
  MenuItem,
  TextField,
  Container,
  Box,
  Button,
} from "@mui/material";
import * as React from "react";
import axios from "axios";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

//font color
import { font, color, SERVER_URL } from "../../../constants";

//style
import { textStyle, btnStyle } from "../../../style";

//check in context
import { CreateCheckInContext } from "../../../context/createCheckIn.context";

import { roomTypeContext } from "../../../context/roomType.context";
import { roomContext } from "../../../context/room.context";

// api
//import { fetchAllRoomType, fetchAvailableRoom } from "../../../api";
import ShowRoom from "./ShowRoom";
import { SavedSearch, Today } from "@mui/icons-material";

export default function UserInfo() {
  const toDay = new Date(Date.now());
  const nextDay = new Date(toDay.setDate(toDay.getDate() + 1));
  const [startDate, setStartDate] = React.useState(Date.now());
  const [endDate, setEndDate] = React.useState(nextDay);

  const hotelID = localStorage.getItem("hotel");

  const width = "auto";
  const [verifys, setVerify] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [selectedRoomType, setSelectedRoomType] = React.useState("");
  const [selectedRoom, setSelectedRoom] = React.useState("");
  const [paid, setPaid] = React.useState(false)

  const { checkInData, setCheckInData } =
    React.useContext(CreateCheckInContext);

  const { roomType, setRoomType } = React.useContext(roomTypeContext);
  const { room, setRoom } = React.useContext(roomContext);

  const fetchAllRoomType = async () => {
    await axios
      .get(`${SERVER_URL}/api/room-types/skip/0/limit/30?hotelId=${hotelID}`, {
        timeout: 5000,
      })
      .then(async (res) => {
        await setRoomType(res.data.roomTypes);
        await console.log(roomType);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchRoomByType = async (type) => {
    var config = {
      method: "get",
      url: `${SERVER_URL}/api/rooms/skip/0/limit/30?hotelId=${hotelID}&type=${type}`,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 5000,
    };

    await axios(config)
      .then(async (response) => {
        await setRoom(response.data.rooms);
        await console.log(room);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const postCheckIn = async (post)=>{

    var config = {
      method: 'post',
      url: 'http://localhost:8080/api/create/check-in',
      headers: { 
        'Authorization': localStorage.getItem('accessToken'), 
        'Content-Type': 'application/json'
      },
      timeout: 5000,
      data : post
    };
    
    axios(config)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const handleSelectRoomType = async (e) => {
    e.preventDefault();
    await setSelectedRoomType(e.target.value);
    setSelectedRoom("");
    setCheckInData({ ...checkInData, room: "" });
    fetchRoomByType(e.target.value);
    console.log(selectedRoomType);
  };
  const handleSelectRoom = async (e) => {
    e.preventDefault();
    await setSelectedRoom(e.target.value);
    await setCheckInData({ ...checkInData, room: e.target.value });
    console.log(selectedRoom);
  };

  React.useEffect(() => {
    fetchAllRoomType();
    console.log(roomType);
    console.log(room);
    console.log(checkInData);
  }, []);

  return (
    <>
      <Stack direction="column" spacing={2}>
        <Stack direction="column" spacing={2}>
          <Stack>
            <label>ເພດ</label>
            <Select
              sx={{
                ...textStyle,
                fontFamily: `${font.LAO_FONT}`,
                height: 35,
                width: `${width}`,
              }}
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
                setCheckInData({ ...checkInData, gender: e.target.value });
                console.log(checkInData);
              }}
              variant="outlined"
            >
              <MenuItem sx={{ fontFamily: `${font.LAO_FONT}` }} value="MALE">
                ທ້າວ
              </MenuItem>
              <MenuItem sx={{ fontFamily: `${font.LAO_FONT}` }} value="FEMALE">
                ນາງ
              </MenuItem>
            </Select>
          </Stack>
          <Stack>
            <label>ຊື່</label>
            <TextField
              placeholder="First name"
              variant="outlined"
              sx={{
                ...textStyle,
                width: `${width}`,
                backgroundColor: "white",
              }}
              onChange={(e) => {
                e.preventDefault();
                setCheckInData({ ...checkInData, firstName: e.target.value });
                console.log(checkInData);
              }}
            />
          </Stack>
          <Stack>
            <label>ນາມສະກຸນ</label>
            <TextField
              placeholder="Last name"
              variant="outlined"
              sx={{
                ...textStyle,
                width: `${width}`,
                backgroundColor: "white",
              }}
              onChange={(e) => {
                e.preventDefault();
                setCheckInData({ ...checkInData, lastName: e.target.value });
                console.log(checkInData);
              }}
            />
          </Stack>
          <Stack>
            <label>ເບີໂທລະສັບ</label>
            <TextField
              placeholder="020 XXX XXXXX"
              variant="outlined"
              sx={{
                ...textStyle,
                width: `${width}`,
                backgroundColor: "white",
              }}
              onChange={(e) => {
                e.preventDefault();
                setCheckInData({ ...checkInData, phone: e.target.value });
                console.log(checkInData);
              }}
            />
          </Stack>
          <Stack>
            <label>ເອກະສານອ້າງອີງ</label>
            <Select
              sx={{
                ...textStyle,
                fontFamily: `${font.LAO_FONT}`,
                height: 35,
                width: `${width}`,
              }}
              value={verifys}
              onChange={(e) => {
                //e.preventDefault();

                setVerify(e.target.value);

                setCheckInData({ ...checkInData, reference: e.target.value });
              }}
              variant="outlined"
            >
              <MenuItem
                sx={{ fontFamily: `${font.LAO_FONT}` }}
                value="PASSPORT"
              >
                Passport
              </MenuItem>
              <MenuItem sx={{ fontFamily: `${font.LAO_FONT}` }} value="IDCARD">
                ID card
              </MenuItem>
            </Select>
          </Stack>
          <Stack>
            <label>ເລກທີ</label>
            <TextField
              placeholder=""
              variant="outlined"
              sx={{
                ...textStyle,
                width: `${width}`,
                backgroundColor: "white",
              }}
              onChange={(e) => {
                e.preventDefault();

                setCheckInData({ ...checkInData, verify: e.target.value });
              }}
            />
          </Stack>
          <Stack>
            <label>ເລືອກປະເພດຫ້ອງ</label>
            <Select
              sx={{
                ...textStyle,
                fontFamily: `${font.LAO_FONT}`,
                height: 35,
                width: `${width}`,
              }}
              value={selectedRoomType}
              onChange={handleSelectRoomType}
              variant="outlined"
            >
              {roomType?.map((val, idx) => {
                return (
                  <MenuItem
                    key={idx}
                    sx={{ fontFamily: `${font.LAO_FONT}` }}
                    value={val.roomType._id}
                  >
                    {val.roomType.typeName}
                  </MenuItem>
                );
              })}
            </Select>
          </Stack>
          {selectedRoomType !== "" ? (
            <Stack>
              <label>ເລືອກຫ້ອງ</label>
              {/*<ShowRoom room={room} />*/}
              <Select
                sx={{
                  ...textStyle,
                  fontFamily: `${font.LAO_FONT}`,
                  height: 35,
                  width: `${width}`,
                }}
                value={selectedRoom}
                onChange={handleSelectRoom}
                variant="outlined"
              >
                {room?.map((val, idx) => {
                  return (
                    <MenuItem
                      key={idx}
                      sx={{ fontFamily: `${font.LAO_FONT}` }}
                      value={val._id}
                    >
                      {val.roomName}
                    </MenuItem>
                  );
                })}
              </Select>
            </Stack>
          ) : null}
          <Stack direction="row" spacing={2}>
            {/**start date */}
            <Stack>
              <label id="dateOfBirth">ວັນທີແຈ້ງເຂົ້າ</label>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  inputFormat="dd/MM/yyyy"
                  value={startDate}
                  onChange={(value) => {
                    const _date = new Date(value);
                    console.log(_date.toLocaleDateString("en-GB"));
                    const saveDate = _date.toLocaleDateString("en");
                    setStartDate(value);
                    //setData({
                    //  ...data,
                    //  birthday: saveDate,
                    //});
                    setCheckInData({ ...checkInData, checkInDate: _date });
                  }}
                  renderInput={(params) => (
                    <TextField
                      onChange={
                        (e) => {}
                        ///setData({
                        ///  ...data,
                        ///  birthday: e.target.value,
                        ///})
                      }
                      sx={{
                        ...textStyle,
                        width: "250px",
                        backgroundColor: "white",
                      }}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </Stack>

            {/**End date */}
            <Stack>
              <label id="dateOfBirth">ຫາວັນທີ</label>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  inputFormat="dd/MM/yyyy"
                  value={endDate}
                  onChange={(value) => {
                    const _date = new Date(value);
                    console.log(_date.toLocaleDateString("en-GB"));
                    const saveDate = _date.toLocaleDateString("en");
                    setEndDate(value);
                    //setData({
                    //  ...data,
                    //  birthday: saveDate,
                    //});
                    setCheckInData({ ...checkInData, checkOutDate: _date });
                  }}
                  renderInput={(params) => (
                    <TextField
                      onChange={
                        (e) => {}
                        ///setData({
                        ///  ...data,
                        ///  birthday: e.target.value,
                        ///})
                      }
                      sx={{
                        ...textStyle,
                        backgroundColor: "white",
                        width: "250px",
                      }}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </Stack>
            <Stack>
              <label>ສະຖານະການຈ່າຍເງີນ</label>
              {/*<ShowRoom room={room} />*/}
              <Select
                sx={{
                  ...textStyle,
                  fontFamily: `${font.LAO_FONT}`,
                  height: 35,
                  width: `200px`,
                }}
                value={paid}
                onChange={(e)=>{
                  setPaid(e.target.value)
                  setCheckInData({...checkInData, isPaid: e.target.value})

                }}
                variant="outlined"
              >
                <MenuItem sx={{ fontFamily: `${font.LAO_FONT}` }} value={false}>
                  ຍັງບໍໍໄດ້ຈ່າຍ
                </MenuItem>
                <MenuItem sx={{ fontFamily: `${font.LAO_FONT}` }} value={true}>
                  ຈ່າຍແລ້ວ
                </MenuItem>
              </Select>
            </Stack>
          </Stack>

          <Stack>
            <Button
              size="small"
              disableElevation
              variant="contained"
              sx={{ ...btnStyle, width: "100px" }}
              onClick={async () => {
                //await setCheckInData({...checkInData, checkInDate: startDate, checkOutDate: endDate, })
                console.log(checkInData);
                postCheckIn(checkInData);
              }}
            >
              ແຈ້ງເຂົ້າ
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
