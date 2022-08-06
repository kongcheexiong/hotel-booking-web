import {
  Stack,
  TextField,
  Button,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import { Select, MenuItem } from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { Chip } from "@mui/material";

import React from "react";
import { useFormatDate } from "../../../services/formateDate";
import { textStyle, btnStyle, datagridSx } from "../../../style";
import { font, SERVER_URL, router } from "../../../constants";
import { useNavigate } from "react-router-dom";

//icon
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

import { counterContext } from "../../../context/counter";

import { DeleteForever } from "@mui/icons-material";
import { BookingContext } from "../../../context/booking.context";

export default function Table() {
  const navigate = useNavigate();
  const date = new Date();
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [filter, setFilter] = React.useState("ALL");
  const [bookingSearchPhone, setbookingsSearchPhone] = React.useState([]);
  const [phoneSearch, setPhoneSearch] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(10);

  const hotel = localStorage.getItem("hotel");
  const token = localStorage.getItem("accessToken");
  const {bookingContext,setbookingContext} = React.useContext(BookingContext)

  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const { value, setValue } = React.useContext(counterContext);
  // const { bookings, setbookings } = React.useContext(BookingContext);
  const [bookings, setbookings] = React.useState([]);

  const fetchData = async () => {
    setbookings([]);
    setLoading(true);
    setErr(false);
    //setSuccess(false);

    var config = {
      method: "get",
      url: `${SERVER_URL}/api/bookings/skip/0/limit/30?hotel=${hotel}&isOnline=${false}`,
      headers: {
        Authorization: `${token}`,
      },
      timeout: 40000,
    };

    await axios(config)
      .then(async (response) => {
        // console.log(response.data.bookings);
        await setbookings(response.data.bookings);
        await setbookingContext(response.data.bookings)
        await setLoading(false);
        setSuccess(true);
      })
      .catch(function (error) {
        setErr(true);
        setLoading(false);
        // console.log(error);
      });
  };

  const fetchDataByDate = async () => {
    setbookings([]);

    setLoading(true);
    setErr(false);

    //setSuccess(false);
    //var sendDate = new Date(setDate(startDate.getDate()-1))
    // var sendDate = new Date(startDate.getDate()-1);

    // sendDate.toLocaleDateString();

    var today = new Date(startDate);
    var yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    // console.log("==>", yesterday);

    //console.log("====>", sendDate);
    var config = {
      method: "get",
      url: `${SERVER_URL}/api/bookingsByFilter/skip/0/limit/100?hotel=${hotel}&startDate=${yesterday}&endDate=${endDate}&status=${filter}&isOnline=false`,
      headers: {
        Authorization: `${token}`,
      },
      timeout: 40000,
    };

    await axios(config)
      .then(async (response) => {
        // console.log(response.data.bookings);
        await setbookings(response.data.bookings);
        await setbookingContext(response.data.bookings)
        await setLoading(false);
        setSuccess(true);
      })
      .catch(function (error) {
        setErr(true);
        setLoading(false);
        console.log(error);
      });
  };


  const cancelBooking = async (id) => {
    // console.log('id: ', id);
    let bookingData = {
      id,
    };

    let config = {
      method: "put",
      url: `${SERVER_URL}/api/cancel/booking`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      timeout: 40000,
      data: bookingData,
    };

    await axios(config)
      .then(function (response) {
        setLoading(false);
        setErr(false);
        setSuccess(true);
        setValue((value) => value + 1);
        alert("Canceled Successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const columns = [
    {
      field: "action",
      headerName: "ຕົວເລືອກ",
      width: 100,
      sortable: false,
      renderCell: (parram) => {
        if (parram.row.status === "REJECTED") {
          return <div></div>
        }
        return (
          <Stack direction="row" spacing={0}>
            <Tooltip title="ແຈ້ງເຂົ້າ">
              <IconButton
                onClick={() => {
                  navigate(`${router.CHECKIN}/add`, { state: parram.row });
                }}
              >
                <HourglassTopIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="ລົບອອກ">
              <IconButton
                onClick={() => {
                  cancelBooking(parram.row._id);
                }}
              >
                <DeleteForever />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      },
    },
    {
      field: "_id",
      headerName: "ລະຫັດ",
      width: 80,
    },




    {
      field: "customerPhone",
      headerName: "ເບີໂທລະສັບ",
      flex: 1,
      sortable: false,
    },

    {
      field: "roomType",
      headerName: "ປະເພດຫ້ອງ",
      flex: 1,
      renderCell: (params) => {
        if (!params.row.roomType) {
          return null;
        }

        return params.row.roomType.typeName;
      },
    },
    {
      field: "quantity",
      headerName: "ຈໍານວນ",
      type: "number",
      flex: 0.7,
    },
    {
      field: "checkInDate",
      headerName: "ວັນທີເຂົ້າພັກ",
      type: "number",
      flex: 1,
      renderCell: (params) => {
        const date = useFormatDate(params.row.checkInDate);
        return <div>{date}</div>;
      },
    },
    {
      field: "createdAt",
      headerName: "ວັນທີ່ສ້າງລາຍການ",
      type: "date",
      flex: 1.2,
      renderCell: (params) => {
        // var today = new Date(params.row.createdAt);
        // today.setHours(today.getHours() + 7);
        const date = useFormatDate(params.row.createdAt);
        return <span>{date}</span>;
      },
    },
    {
      field: "status",
      headerName: "ສະຖານະ",
      flex: 1.2,
      renderCell: (parram) => {
        if (parram.row.status === "PENDING") {
          return (
            <Chip
              sx={{ fontFamily: "Noto Sans Lao", width: "100px" }}
              color="success"
              label="ລໍຖ້າແຈ້ງເຂົ້າ"
              variant="outlined"
            />
          );
        }
        if (parram.row.status === "REJECTED") {
          return (
            <Chip
              sx={{ fontFamily: "Noto Sans Lao", width: "100px" }}
              color="error"
              label="ຍົກເລີກ"
              variant="outlined"
            />
          );
        }
        return (
          <Chip
            sx={{ fontFamily: "Noto Sans Lao", width: "100px" }}
            //color="secondary"
            label="ແຈ້ງເຂົ້າແລ້ວ"
            color="success"
          />
        );
      },
    },
  ];

  React.useEffect(() => {
    //const date = new Date()
    //setStartDate(date)
    //setEndDate(date)
    fetchData();
  }, [value]);

  return (
    <Stack direction="column">
      <Stack direction="column" spacing={3}>
        {/**filter */}
        <Stack direction="row" spacing={1}>
          {/**start date */}
          <Stack>
            <label id="dateOfBirth">ຕັ້ງແຕ່ວັນທີ</label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                inputFormat="dd/MM/yyyy"
                value={startDate}
                onChange={(value) => {
                  const _date = new Date(value);
                  // console.log(_date.toLocaleDateString("en-GB"));
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
            <label id="dateOfBirth">ຫາວັນທີ</label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                inputFormat="dd/MM/yyyy"
                value={endDate}
                onChange={(value) => {
                  const _date = new Date(value);
                  // console.log(_date.toLocaleDateString("en-GB"));
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
                ລໍຖ້າແຈ້ງເຂົ້າ
              </MenuItem>
              <MenuItem sx={{ fontFamily: `${font.LAO_FONT}` }} value="CHECKIN">
                ແຈ້ງເຂົ້າແລ້ວ
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: `${font.LAO_FONT}` }}
                value="REJECTED"
              >
                ຍົກເລີກ
              </MenuItem>
            </Select>
          </Stack>
          <Stack direction="column" justifyContent="flex-end">
            <Button
              color="success"
              variant="contained"
              disableElevation
              sx={{
                ...btnStyle,
                marginLeft: "10px",
                width: "100px",
              }}
              onClick={() => { fetchDataByDate() }}
            >
              ຄົ້ນຫາ
            </Button>
          </Stack>
        </Stack>
        <Divider />
        {/**search textfield */}
        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={1}
          alignItems="center"
        >
          {/**search */}

          <span>ຄັ້ນຫາ:</span>
          <TextField
            placeholder="ເບີໂທລະສັບ"
            variant="outlined"
            sx={{ ...textStyle, width: "200px", backgroundColor: "white" }}
            onChange={(e) => {

              if (e.target.value !== "") {
                setPhoneSearch(true);
              } else { setPhoneSearch(false) }

              let filtered = bookings.filter(b => b.customerPhone.includes(e.target.value));
              setbookingContext(response.data.bookings)
              setbookingsSearchPhone(
                filtered
              );
            }}
          />

          {/**
         *  <Button
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
         */}
        </Stack>
        {/**table */}
      </Stack>

      {err && <h1>Error while loading</h1>}
      <div style={{ height: 660, width: "100%" }}>
        <DataGrid
          sx={{ ...datagridSx, marginTop: "10px" }}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          rows={phoneSearch ? bookingSearchPhone : bookings}
          columns={columns}
          disableSelectionOnClick
          getRowId={(row) => row._id}
          loading={loading}
        />
      </div>
    </Stack>
  );
}
