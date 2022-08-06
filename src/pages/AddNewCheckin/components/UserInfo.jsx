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
import _ from "lodash";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//font color
import { font, color, SERVER_URL, router } from "../../../constants";

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
  const day =new Date( Date.now())
  const toDay = new Date(day.setDate(day.getDate()));
  const navigate = useNavigate();

  const nextDay = new Date(day.setDate(day.getDate()));

  const [startDate, setStartDate] = React.useState(nextDay);
  const [endDate, setEndDate] = React.useState('');

  const hotelID = localStorage.getItem("hotel");

  const width = "auto";
  const [verifys, setVerify] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [selectedRoomType, setSelectedRoomType] = React.useState("");
  const [selectedRoom, setSelectedRoom] = React.useState("");
  const [paid, setPaid] = React.useState(false)
  const [rooms, setRooms] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const { checkInData, setCheckInData } =
    React.useContext(CreateCheckInContext);

  const { roomType, setRoomType } = React.useContext(roomTypeContext);
  // const { room, setRoom } = React.useContext(roomContext);

  // get booking data
  const location = useLocation();
  var bookingData = location.state;
  console.log('data: ', bookingData);

  const [sending,setSending] = React.useState(false)
  const [err ,setErr] = React.useState(false)
  const [success,setSuccess] = React.useState(false)

  const fetchAllRoomType = async () => {
    await axios
      .get(`${SERVER_URL}/api/room-types/skip/0/limit/30?hotelId=${hotelID}`, {
        timeout: 40000,
      })
      .then(async (res) => {
        await setRoomType(res.data.roomTypes);
        // await console.log(roomType);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //get rooms when select room type
  const fetchRoomsData = async (type) => {
    // var id = location.state.roomType._id;
    setLoading(true);
    const res = await fetch(`${SERVER_URL}/api/rooms-by-room-type?roomType=${type}&status=false`);
    const data = await res.json();
    setRooms(data);
    setLoading(false);
  }

  const postCheckIn = async (post) => {
    setSending(true)
    // console.log('dssssssssssssssss')
    var config = {
      method: 'post',
      url: `${SERVER_URL}/api/create/check-in`,
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json'
      },
      timeout: 40000,
      data: post
    };

    await axios(config)
      .then(function (response) {
        // console.log(response.data);
        setSending(false)
        setSuccess(true)
        setErr(false)
      })
      .catch(function (error) {
        console.log(error);
        setErr(true)
        setSending(false)
        setSuccess(false)
      });
  }

  const postCheckInBookingList = async () => {
    setSending(true)
    var roomData = [];
    var checkInDatas = [];
    for (var i = 0; i < bookingData.quantity; i++) {
      // await setCheckInData({ ...checkInData, room: rooms[i]._id });
      await roomData.push({ _id: rooms[i]._id })
      await checkInDatas.push({ ...checkInData, room: rooms[i]._id })
    }
    var data = {
      bookingID: bookingData._id,
      roomData: roomData,
      checkInData: checkInDatas
    };
    var config = {
      method: 'post',
      url: `${SERVER_URL}/api/create/check-in/booking-list`,
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json'
      },
      // timeout: 40000,
      data: data
    };

    await axios(config)
      .then(function (response) {
         console.log(response.data);
    setSending(false)
    navigate(`${router.CHECKIN}`);
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
    // await fetchRoomByType(e.target.value);
    fetchRoomsData(e.target.value);
    // console.log(selectedRoomType);
  };

  const handleSelectRoom = async (e) => {
    e.preventDefault();
    if (bookingData !== null) {
      await setBookingRooms(current => [...current, { id: e.target.value }]);

    }
    await setSelectedRoom(e.target.value);
    await setCheckInData({ ...checkInData, room: e.target.value });
    // console.log(e.target.value);
  };

  React.useEffect(() => {
    // fetchRoomByType(bookingData.roomType._id);
    if (bookingData !== null) {
      fetchRoomsData(bookingData.roomType._id);
    }
    fetchAllRoomType();
    console.log('===================================<><>', rooms);
    // console.log(roomType);
    // console.log(room);
    // console.log(checkInData);
  }, []);

  return (
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
              // console.log(checkInData);
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
              // console.log(checkInData);
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
              // console.log(checkInData);
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
              // console.log(checkInData);
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
        {loading ? <b>Loading...</b> : bookingData !== null && rooms.length !== 0 ?
          (
          <>
          <Stack direction='row' spacing={2}>
           <Stack direction= 'row' spacing={1}>
            ປະເພດຫ້ອງ:
           <b style={{ color: `${color.BLUE_COLOR}`, marginLeft: 10 }}>{bookingData.roomType.typeName ?? '-'}</b>
           </Stack>
           <Stack  direction= 'row' spacing={1}>
           ຈໍານວນ:
              <b style={{ color: `${color.BLUE_COLOR}`, marginLeft: 10 }}>{bookingData.quantity ?? '-'} ຫ້ອງ</b>
            
           </Stack>
          
           

           
          </Stack>
          {
              _.times(bookingData.quantity, (i) => (
                <Stack key={i} >
                 
                  <Stack direction='row'>
                    <label> + ຫ້ອງທີ {i + 1}</label>
                    {<b style={{ color: `${color.BLUE_COLOR}`, marginLeft: 10 }}>{rooms[i]?.roomName}</b>}
                    {/*<ShowRoom room={room} />*/}
                    {/* <Select
                    sx={{
                      ...textStyle,
                      fontFamily: `${font.LAO_FONT}`,
                      height: 35,
                      width: `${width}`,
                    }}
                    // value={rooms[i]._id}
                    onChange={handleSelectRoom}
                    variant="outlined"
                  >
                    {rooms?.map((val, idx) => {
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
                  </Select> */}
                  </Stack>
                </Stack>
              ))
            }
          
          </>) :
          (<Stack>
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
          </Stack>)

        }
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
              {rooms?.map((val, idx) => {
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
                  // console.log(_date.toLocaleDateString("en-GB"));
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
                      (e) => { }
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
                  // console.log(_date.toLocaleDateString("en-GB"));
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
                      (e) => { }
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
              onChange={(e) => {
                setPaid(e.target.value)
                setCheckInData({ ...checkInData, isPaid: e.target.value })

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

        <Stack direction='row' spacing={2}>
          <Button
            size="small"
            disableElevation
            variant="contained"
            sx={{ ...btnStyle, width: "100px" }}
            onClick={async () => {
              //await setCheckInData({...checkInData, checkInDate: startDate, checkOutDate: endDate, })
               console.log(checkInData);
             if (bookingData !== null) {
               return postCheckInBookingList();
             }
  
             postCheckIn(checkInData);

           //console.log(checkInData)
            }}
          >
            ແຈ້ງເຂົ້າ
          </Button>
          { sending? <span>ກຳລັງສ້າງຂໍ້ມູນ...</span>: err? <span>ເກີດຂໍ້ຜິດພາດ !!!</span>: success? <span>ສ້າງຂໍ້ມູນສໍາເລັດ</span> : null}
         
        </Stack>
      </Stack>
    </Stack >
  );
}
