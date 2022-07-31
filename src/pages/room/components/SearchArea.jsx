import * as React from "react";
import { Stack, TextField, Button, InputAdornment, Box } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import SearchIcon from "@mui/icons-material/Search";

import { textStyle, btnStyle, datagridSx } from "../../../style";
import { font } from "../../../constants/index";
import { counterContext } from "../../../context/counter";
import { roomContext } from "../../../context/room.context";
import { SERVER_URL } from "../../../constants/index";

import axios from "axios";

export default function SearchArea() {
  const { value, setValue } = React.useContext(counterContext);
  const { room, setRoom } = React.useContext(roomContext);

  //const {data,setData} = React.useContext(dataContext)
  const [search, setSearch] = React.useState("");
  const hotel = localStorage.getItem("hotel");

  const fetchData = async () => {
    setRoom({ ...room, roomLoading: true, roomErr: false, roomSuccess: false });

    await axios
      .get(`${SERVER_URL}/api/room?hotelId=${hotel}&roomName=${search}`, {
        timeout: 5000,
      })
      .then((res) => {
        console.log(res.data);
        let d = res.data
        //alert('success')
        setRoom({
          ...room, d
         // roomData: res.data,
         // roomLoading: false,
         // roomSuccess: true,
        });
      })
      .catch((err) => {
        console.error(err);
        alert(err);
        
      });

    // console.log(resData);
  };
  return (
    <>
    </>
    
  );
}
