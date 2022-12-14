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

import { font, router, SERVER_URL } from "../../../constants";
import { counterContext } from "../../../context/counter";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { CheckInContextContext } from "../../../context/checkin.context";
import axios from "axios";
export default function Menu() {
  const navigate = useNavigate();

  const hotel = localStorage.getItem("hotel");
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const { CheckInContext, setCheckInContext } = React.useContext(
    CheckInContextContext
  );
  const [filter, setFilter] = React.useState("ALL");
  const { value, setValue } = React.useContext(counterContext)
  //const [displayFilter, setDisplayFilter] = React.useState('ALL')
  const searchCheckInData = async () => {
    setCheckInContext([]);

    // setLoading(true);
    // setErr(false);

    var today = new Date(startDate);
    var yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    // console.log("==>", yesterday);

    //console.log("====>", sendDate);
    var config = {
      method: "get",
      url: `${SERVER_URL}/api/search/check-in-data/skip/0/limit/100?hotel=${hotel}&startDate=${yesterday}&endDate=${endDate}&status=${filter}&isOnline=true`,
      timeout: 40000,
    };

    await axios(config)
      .then(async (response) => {
        setCheckInContext(response.data?.checkIns);
        setValue(value + 1);
        // console.log(response.data.bookings);
        // await setCheckInContext(response.data.bookings);
        // await setLoading(false);
        // setSuccess(true);
      })
      .catch(function (error) {
        // setErr(true);
        // setLoading(false);
        console.log(error);
      });
  };


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
          ???????????????????????????
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
          onClick={() => {
            setValue(value => value + 1)
          }}
        >
          Reload
        </Button>
        <Button
          size="small"
          startIcon={<PictureAsPdfIcon />}
          disableElevation
          variant="outlined"
          color="error"
          sx={{
            ...btnStyle,
            width: "110px",
            "&.MuiButton-root": {
              width: "130px",
              fontFamily: `${font.LAO_FONT}`,
              height: 30,
            },
          }}
          onClick={() => {
            setValue(value => value + 1)
          }}
        >
          ????????????????????????????????????
        </Button>

      </Stack>
      <hr />
      <Stack direction="row" spacing={3}>
        {/**start date */}
        <Stack>
          <label id="dateOfBirth">????????????????????????????????????</label>
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
          <label id="dateOfBirth">?????????????????????</label>
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
        {/**status filter */}
        <Stack>
          <label id="" gender>
            ??????????????????
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
              ?????????????????????????????????
            </MenuItem>
            <MenuItem sx={{ fontFamily: `${font.LAO_FONT}` }} value="PENDING">
              ????????????????????????????????????
            </MenuItem>
            <MenuItem
              sx={{ fontFamily: `${font.LAO_FONT}` }}
              value="CHECKEDOUT"
            >
              ?????????????????????????????????
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
            onClick={() => { searchCheckInData() }}
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
