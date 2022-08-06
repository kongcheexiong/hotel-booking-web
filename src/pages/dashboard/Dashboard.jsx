import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";

// auth
import Auth from "../../auth.js";
import { router } from "../../constants/index.js";
import StaticCard from "./components/StaticCard.jsx";
import CustomBarChart from "./components/barChart.jsx";
import { SERVER_URL } from "../../constants/index.js";
import axios from "axios";

import { format } from "date-fns";

function Dashboard() {
  const today = new Date();
  const hotelID = localStorage.getItem("hotel");
  const navigate = useNavigate();
  const [room, setRoom] = React.useState(0);
  const [roomType, setRoomType] = React.useState(0);
  const [availableRoom, setAvailableRoom] = React.useState(0);
  const [employee, setEmployee] = React.useState(0);
  const [booking, setBooking] = React.useState(0);
  const [checkIn, setCheckIn] = React.useState(0);

  const [latestBooking, setLatestBooking] = React.useState([])
  const [latestCheckIn, setLatestCheckIn] = React.useState([])

  const [success,setSuccess] = React.useState(false)
  const [err, setErr] = React.useState(false)
  const [loading,setLoading] = React.useState(true)

  const labels = [
    format(new Date(today), "dd/MM/yyyy"),
    format(new Date(today.setDate(today.getDate() - 1)), "dd/MM/yyyy"),
    format(new Date(today.setDate(today.getDate() - 1)), "dd/MM/yyyy"),
    format(new Date(today.setDate(today.getDate() - 1)), "dd/MM/yyyy"),
    format(new Date(today.setDate(today.getDate() - 1)), "dd/MM/yyyy"),
    format(new Date(today.setDate(today.getDate() - 1)), "dd/MM/yyyy"),
    format(new Date(today.setDate(today.getDate() - 1)), "dd/MM/yyyy"),
  ];

  const totalRoomType = async () => {
    setLoading(true);
    await axios
      .get(`${SERVER_URL}/api/get-all-data/show/dashboard?hotel=${hotelID}`, {
        timeout: 40000,
      })
      .then(async (res) => {
        console.log(res.data)
        await setRoomType(res.data.totalRoomType);
        await setRoom(res.data.totalRoom);
        await setAvailableRoom(res.data.totalEmptyRoom);
        await setEmployee(res.data.totalUser);
        await setBooking(res.data.totalBooking);
        await setCheckIn(res.data.totalCheckIn);
        await  setLatestBooking(res.data.latestBookings);
        await  setLatestCheckIn(res.data.latestCheckIns);
        console.log(res.data)
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // const totalRoomType = async () => {
  //   await axios
  //     .get(`${SERVER_URL}/api/room-types/skip/0/limit/30?hotelId=${hotelID}`, {
  //       timeout: 40000,
  //     })
  //     .then(async (res) => {
  //       await setRoomType(res.data.total);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };
  // const totalRoom = async () => {
  //   var config = {
  //     method: "get",
  //     url: `${SERVER_URL}/api/rooms/skip/0/limit/30?hotelId=${hotelID}`,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     timeout: 40000,
  //   };

  //   await axios(config)
  //     .then((response) => {
  //       setRoom(response.data.total);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  // const totalRoomAvailable = async () => {
  //   var config = {
  //     method: "get",
  //     url: `${SERVER_URL}/api/rooms/skip/0/limit/30?hotelId=${hotelID}&status=false`,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     timeout: 40000,
  //   };

  //   await axios(config)
  //     .then((response) => {
  //       setAvailableRoom(response.data.total);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  // const totalEmployee = async () => {
  //   await axios
  //     .get(`${SERVER_URL}/api/users/skip/0/limit/30?hotelId=${hotelID}`, {
  //       timeout: 40000,
  //     })
  //     .then((res) => {
  //       setEmployee(res.data.total);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };
  // const latestBookings = async () => {
  //   await axios
  //     .get(`${SERVER_URL}/api/latestBooking?hotelId=${hotelID}`, {
  //       timeout: 40000,
  //     })
  //     .then((res) => {
  //       setLatestBooking(res.data.latestBookings);
  //       console.log(latestBooking)
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  const fetchData = async() => {

    // await totalRoom();
    await totalRoomType();
    // console.log(latestBooking)
    // await totalRoomAvailable();
    // await totalEmployee();
    // await latestBookings()
    setErr(false)
    setLoading(false)
    setSuccess(true)

  }
  React.useEffect(() => {
    fetchData()
   
    // latestBookings()
  },[]);

  return (
    <div>
      {err && <h1>Something went wrong</h1>}
      {loading && <h1>loading...</h1>}
      {success && 
      <Stack direction="column" spacing={2}>
        {/**static card */}
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <StaticCard title="ປະເພດຫ້ອງ" value={roomType} />
          <StaticCard title="ຈໍານວນຫ້ອງ" value={room} />
          <StaticCard title="ຫ້ອງຫວ່າງ" value={availableRoom} />
        

        </Stack>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          
          <StaticCard title="ພະນັກງານ" value={employee} />
          <StaticCard title="ການຈອງຍັງຄ້າງຢູ່" value={booking} />
          <StaticCard title="ກໍາລັງເຊັດອິນ" value={checkIn} />

        </Stack>

        {/**booking in a week */}
        <CustomBarChart data={latestBooking} title = "ການຈອງໃນແຕ່ລະມື້" />
        {/**check in in a week */}
        <CustomBarChart data={latestCheckIn}  title = "ການແຈ້ງເຂົ້າໃນແຕ່ລະມື້" />
      </Stack>}
      
    </div>
  );
}

export default Dashboard;
