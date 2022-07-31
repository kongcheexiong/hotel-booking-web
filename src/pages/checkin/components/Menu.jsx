import { AddIcCallOutlined } from "@mui/icons-material";
import { Button, Stack, TextField, Select, MenuItem } from "@mui/material";
import { GridAddIcon } from "@mui/x-data-grid";
import * as React from "react";
import { useNavigate } from "react-router-dom";

//icon
import SearchIcon from "@mui/icons-material/Search";
import CachedIcon from "@mui/icons-material/Cached";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

//import style
import { btnStyle, textStyle } from "../../../style";

import { font, router } from "../../../constants";

export default function Menu() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();

  const [filter, setFilter] = React.useState("ALL");
  //const [displayFilter, setDisplayFilter] = React.useState('ALL')

  return (
    <Stack direction="column" spacing={3}>
      {/** action button */}
      <Stack direction="row" spacing={2}>
        <Button
          size="small"
          startIcon={<GridAddIcon />}
          disableElevation
          variant="contained"
          sx={{
            ...btnStyle,
            width: "110px",
            "&.MuiButton-root": {
              width: "100px",
              fontFamily: `${font.LAO_FONT}`,
              height: 30,
            },
          }}
          onClick={() => {
            navigate(`${router.CHECKIN}/add`);
          }}
        >
          ແຈ້ງເຂົ້າ
        </Button>
        <Button
          size="small"
          startIcon={<FileDownloadIcon />}
          disableElevation
          sx={{
            ...btnStyle,
            width: "110px",
            "&.MuiButton-root": {
              width: "auto",
              fontFamily: `${font.EN_FONT}`,
              height: 30,
            },
          }}
          variant="outlined"
          color="success"
        >
          Export as Excel
        </Button>
          {/**reload */}

          
          <Button
            size="small"
            startIcon={<CachedIcon />}
            disableElevation
            variant="outlined"
            color="secondary"
            sx={{
              ...btnStyle,
              width: "110px",
              "&.MuiButton-root": {
                width: "100px",
                fontFamily: `${font.EN_FONT}`,
                height: 30,
              },
            }}
          >
            Reload
          </Button>
   
      </Stack>
      <hr />
      <Stack direction="row" spacing={3}>
        {/**start date */}
        <Stack>
          <label id="dateOfBirth">ຕັ້ງແຕ່ວັນທີ</label>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="dd/MM/yyyy"
              value={startDate}
              onChange={(value) => {
                const _date = new Date(value);
                console.log(_date.toLocaleDateString("en-GB"));
                const saveDate = _date.toLocaleDateString("en-GB");
                setStartDate(value);
                //setData({
                //  ...data,
                //  birthday: saveDate,
                //});
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
                const saveDate = _date.toLocaleDateString("en-GB");
                setEndDate(value);
                //setData({
                //  ...data,
                //  birthday: saveDate,
                //});
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
        {/**status filter */}
        <Stack>
          <label id="" gender>
            ສະຖານະ
          </label>
          <Select
            sx={{
              ...textStyle,
              fontFamily: `${font.LAO_FONT}`,
              height: 35,
              width: "200px",
            }}
            value={filter}
            onChange={(e) => {
              //setData({ ...data, gender: e.target.value });
              setFilter(e.target.value);
              //setDisplayFilter(e.target.name)
            }}
          >
            <MenuItem sx={{ fontFamily: `${font.LAO_FONT}` }} value="ALL">
              ສະແດງທັງໝົດ
            </MenuItem>
            <MenuItem sx={{ fontFamily: `${font.LAO_FONT}` }} value="PENDING">
              ລໍຖ້າແຈ້ງອອກ
            </MenuItem>
            <MenuItem
              sx={{ fontFamily: `${font.LAO_FONT}` }}
              value="CHECKEDOUT"
            >
              ແຈ້ງອອກແລ້ວ
            </MenuItem>
          </Select>
        </Stack>
         {/**search*/}
         <Stack justifyContent="flex-end" spacing={2}>
          <Button
            size="small"
            startIcon={<SearchIcon />}
            disableElevation
            variant="contained"
            sx={{
              ...btnStyle,
              width: "110px",
              "&.MuiButton-root": {
                fontFamily: `${font.EN_FONT}`,
                height: 35,
              },
            }}
          >
            Search
          </Button>
        </Stack>
        
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="center">
       
      
      </Stack>

      <br />
    </Stack>
  );
}
