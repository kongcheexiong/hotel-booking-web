import * as React from "react";
import { Stack, TextField, Button, InputAdornment, Box } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import SearchIcon from "@mui/icons-material/Search";

import { textStyle, btnStyle, datagridSx } from "../../../style";
import { font } from "../../../constants/index";
import { counterContext } from "../../../context/counter";
import { roomTypeContext } from "../../../context/roomType.context";
import { dataContext } from "../../../context/data.context";
import { SERVER_URL } from "../../../constants/index";

import axios from "axios";

export default function SearchArea() {
  const { value, setValue } = React.useContext(counterContext);

  const { roomType, setRoomType } = React.useContext(roomTypeContext);
  //const {data,setData} = React.useContext(dataContext)
  const [search, setSearch] = React.useState("");
  const hotel = localStorage.getItem("hotel");

  const fetchData = async () => {
    setRoomType([])
    await axios
      .get(`${SERVER_URL}/api/room-type?roomType=${search}&hotelId=${hotel}`, {
        timeout: 40000,
      })
      .then((res) => {
        console.log(res.data.roomTypes);
        
        //alert('success')
        setRoomType(res.data.roomTypes);
        //console.log(roomType);

      })
      .catch((err) => {
        console.error(err);
        alert('No room type found');
      });

    // console.log(resData);
  };
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{ marginTop: "0px" }}
    >
      <label>ຄົ້ນຫາ:</label>
      <TextField
        placeholder="ຊື່ປະເພດຫ້ອງ"
        //InputProps={{
        //  startAdornment: (
        //    <InputAdornment position="start">
        //      <SearchIcon />
        //    </InputAdornment>
        //  ),
        //}}
        sx={{ ...textStyle, width: 200 }}
        onChange={(e) => {
          e.preventDefault()
          setSearch(e.target.value);
        }}
        onKeyDown={(e) => {

          if (e.key === "Enter") {
            console.log(search)
            //setRoomType([]);
            if (search === "") {
              setValue(value => value+1)
              return
            }
            fetchData();
           
          }
        }}
      />
    </Stack>
  );
}
