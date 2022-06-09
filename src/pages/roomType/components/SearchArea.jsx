import * as React from "react";
import { Stack, TextField, Button, InputAdornment, Box } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import SearchIcon from "@mui/icons-material/Search";

import { textStyle, btnStyle, datagridSx } from "../../../style";
import { font } from "../../../constants/index";
import { counterContext } from "../../../context/counter";
import {roomTypeContext} from '../../../context/roomType.context'
import { dataContext } from "../../../context/data.context";
import { SERVER_URL } from "../../../constants/index";

import axios from "axios";

export default function SearchArea() {
  const { value, setValue } = React.useContext(counterContext);

  const {roomType, setRoomType} = React.useContext(roomTypeContext)
  //const {data,setData} = React.useContext(dataContext)
  const [search, setSearch] = React.useState('')
  const hotel = localStorage.getItem('hotel')



  
  const fetchData = async () => {
    setRoomType({...roomType,
       roomTypeLoading: true,
       roomTypeErr: false,
       roomtypeSuccess: false
      
      })
      
        await axios
      .get(
        `${SERVER_URL}/api/room-type?roomType=${search}&hotelId=${hotel}`,
        { timeout: 5000 }
      )
      .then((res) => {
        console.log(res.data)
        //alert('success')
        setRoomType({...roomType,
           roomTypeData: res.data,
           roomTypeLoading: false,
           roomTypeSuccess: true
          })
       
      })
      .catch((err) => {
        console.error(err);
        alert(err)
        setRoomType({...data,
          roomTypeData: res.data,
          roomTypeLoading: false,
          roomTypeSuccess: false,
          roomTypeErr: true
         })
        
      });

      
    
    // console.log(resData);
  };
  return (
    <Stack direction="row" spacing={2}>
      <Stack direction="column">
        <label>ຄົ້ນຫາ</label>
        <TextField
          placeholder="ຊື່ປະເພດຫ້ອງ"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ ...textStyle, width: 300 }}
          onChange={(e) => {
            setSearch(e.target.value)
           
          }}
        />
      </Stack>
      <Stack direction="column" alignItems="flex-end" justifyContent="flex-end">
        <Button
        onClick={async() => {
          await fetchData()

          await console.log(roomType);
        }}
          sx={{
            ...btnStyle,

            "&.MuiButton-root": {
              width: "100px",
              fontFamily: `${font.LAO_FONT}`,
              height: 35,
            },
          }}
          disableElevation
          variant="contained"
          color="success"
          
        >
          ຄົ້ນຫາ
        </Button>
      </Stack>
      <Stack direction="column" alignItems="flex-end" justifyContent="flex-end">
        <Button
        onClick={()=> setValue(value => value+1)}
          disableElevation
          variant="contained"
          sx={{
            ...btnStyle,
            "&.MuiButton-root": {
              fontFamily: `${font.EN_FONT}`,
              width: "100px",
              height: 35,
            },
          }}
        >
          <Stack direction="row">
            <CachedIcon />
            <span>reload</span>
          </Stack>
        </Button>
      </Stack>
    </Stack>
  );
}
