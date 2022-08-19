import {
  Stack,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  Button,
} from "@mui/material";
import * as React from "react";

import { btnStyle, textStyle } from "../../../style";
import { color, font } from "../../../constants";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useLocation } from "react-router-dom";

import { SERVER_URL } from "../../../constants";

import axios from "axios";
import { set } from "date-fns";
import MultipleSelectChip from "./chipSelectmultiple";


export default function AddNewBookingDialog() {
  const width = "auto";
  const [roomType, setRoomType] = React.useState([]);
  const hotelID = localStorage.getItem("hotel");

  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [startDate, setStartDate] = React.useState(new Date());
  const [phone, setPhone] = React.useState("");
  const [num, setNum] = React.useState("");
  const [selectedRoomType, setSelectedRoomType] = React.useState("");

  const [roomNum, setRoomNum] = React.useState(0)

  const [loadNum, setLoadNum] = React.useState(false)

  const fetchData = async () => {
    await axios
      .get(`${SERVER_URL}/api/room-types/skip/0/limit/30?hotelId=${hotelID}`, {
        timeout: 40000,
      })
      .then(async (res) => {
        //setResData(res.data.roomTypes);
        console.log(res.data.roomTypes);

        await setRoomType(res.data.roomTypes);
      })
      .catch((err) => {
        console.error(err);
      });
    // console.log(resData);
  };

  const fetchDataByType = async (type) => {
    setLoadNum(true)
    await axios
      .get(
        `${SERVER_URL}/api/room/for-booking?roomType=${type}&hotelId=${localStorage.getItem('hotel')}`
      )
      .then((res) => {
        //setloading(false);
        console.log(res.data);
        setRoomNum(res.data.num);
        setLoadNum(false)
      })
      .catch((err) => console.error(err));
  };

  const postBooking = async () => {
    setLoading(true);

    axios
      .post(`${SERVER_URL}/api/create/booking/offline`, {
        hotel: localStorage.getItem('hotel'),
        customerPhone: phone,
        roomType: selectedRoomType,
        quantity: num,
        checkInDate: startDate,
        isOnline: false,
      }, {
        headers: {
          //'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        },
      })
      .then((res) => {
        setLoading(false);
        setSuccess(true);
        console.log(res.data);
      })
      .catch((err) => {
        setErr(true);
        console.error(err);
      });
  };

  React.useEffect(() => {
    fetchData();
    console.log(roomNum)
  }, []);

  const Room = (props) =>{
    return <Stack direction='column' spacing={0} alignItems='center' sx={{
      margin: '5px 0px',
 
    borderRadius: '10px',
    padding: '10px',
    backgroundColor: color.GRAY_COLLOR
    }}>
      <span>{props.roomName}</span>
      <span>{props.description}</span>

    </Stack>
    

  }

  return (
    <Stack spacing={1}>
      <Stack width={400}>
        <label htmlFor="phone">ເບີໂທລະສັບ</label>
        <TextField
          //placeholder="First name"\
          inputProps={{ maxLength: 8 }}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <span>020</span>
              </InputAdornment>
            ),
          }}
          sx={{
            ...textStyle,
            width: `${width}`,
            backgroundColor: "white",
          }}
          onChange={(e) => {
            e.preventDefault();
            const num1 = Number(e.target.value);


              if (!Number.isInteger(num1)) {
                return alert('ປ້ອນຂໍ້ມູນໃນ Field ເປັນຕົວເລກ');
                return;
              }
            setPhone(e.target.value);

            // console.log(checkInData);
          }}
        />
      </Stack>
      <Stack>
        <label id="dateOfBirth">ວັນທີແຈ້ງເຂົ້າ</label>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            inputFormat="dd/MM/yyyy"
            value={startDate}
            onChange={(value) => {
              //const _date = new Date(value);
              //// console.log(_date.toLocaleDateString("en-GB"));
              //const saveDate = _date.toLocaleDateString("en");
              setStartDate(value);
              //setData({
              //  ...data,
              //  birthday: saveDate,
              //});
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
                  width: width,
                  backgroundColor: "white",
                }}
                {...params}
              />
            )}
          />
        </LocalizationProvider>
      </Stack>
      <Stack>
        <label id="dateOfBirth">ວັນທີແຈ້ງອອກ</label>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            inputFormat="dd/MM/yyyy"
            value={startDate}
            onChange={(value) => {
              //const _date = new Date(value);
              //// console.log(_date.toLocaleDateString("en-GB"));
              //const saveDate = _date.toLocaleDateString("en");
              setStartDate(value);
              //setData({
              //  ...data,
              //  birthday: saveDate,
              //});
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
                  width: width,
                  backgroundColor: "white",
                }}
                {...params}
              />
            )}
          />
        </LocalizationProvider>
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
          onChange={async (e) => {
            e.preventDefault();
            await setSelectedRoomType(e.target.value);
            setNum('')
            fetchDataByType(e.target.value)
            console.log(selectedRoomType);
          }}
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
      <Stack>
        {selectedRoomType === '' ? <label htmlFor="num">ຈໍານວນຫ້ອງ</label> :
          <>
            {loadNum ? <>ຈໍານວນຫ້ອງ...</> : roomNum <= 0 ? <label htmlFor="num">ບໍ່ມີຫ້ອງຫວ່າງ</label> : <Stack spacing={1}>
            <label htmlFor="num">ຈໍານວນຫ້ອງ  (ຫວ່າງ {roomNum} ຫ້ອງ)</label>
            <MultipleSelectChip/>
            </Stack>}
          </>}
          
{/* 
        <TextField
          //placeholder="First name"
          disabled={selectedRoomType === '' || roomNum <= 0? true : false}
          value={num}
          variant="outlined"
          sx={{
            ...textStyle,
            width: `${width}`,
            backgroundColor: "white",
          }}
          onChange={(e) => {
            e.preventDefault();
            const num1 = Number(e.target.value);


              if (!Number.isInteger(num1)) {
                return alert('ປ້ອນຂໍ້ມູນໃນ Field ເປັນຕົວເລກ');
                return;
              }
            if (e.target.value > roomNum) {
              alert(`ກາລຸນາປ້ອນຈໍານວນຫ້ອງທີ່ຢູ່ລະຫວ່າງ 1 - ${roomNum}`)
              return;
            }
            setNum(e.target.value);

            // console.log(checkInData);
          }}
        />
        */}
      </Stack>
       
    

      <br/>
 
      <Stack>
        {loading ? (
          <span>ກຳລັງສ້າງລາຍການຈອງ...</span>
        ) : success ? (
          <span>ສໍາເລັດ</span>
        ) : err ? (
          <span>error</span>
        ) : null}
        <Button variant="contained" sx={{ ...btnStyle }} onClick={() => {
          if (phone === '' || num === '' || selectedRoomType === '') {
            alert('ກາລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ')
            return;
          }
          postBooking()
        }}>
          ບັນທຶກ
        </Button>
      </Stack>
    </Stack>
  );
}
