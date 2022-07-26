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

import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { Chip } from "@mui/material";

import React from "react";
import { useFormatDate } from "../../../services/formateDate";
import { textStyle, btnStyle, datagridSx } from "../../../style";
import { font, SERVER_URL } from "../../../constants";

//icon
import SearchIcon from "@mui/icons-material/Search";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

import { counterContext } from "../../../context/counter";
import { BookingContext } from "../../../context/booking.context";

import { tr } from "date-fns/locale";

export default function Table() {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [filter, setFilter] = React.useState("ALL");

  const [pageSize, setPageSize] = React.useState(10);

  const hotel = localStorage.getItem("hotel");
  const token = localStorage.getItem("accessToken");

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
      url: `${SERVER_URL}/api/bookings/skip/0/limit/30?hotel=${hotel}`,
      headers: {
        Authorization: `${token}`,
      },
      timeout: 5000,
    };

    await axios(config)
      .then(async (response) => {
        console.log(response.data.bookings);
        await setbookings(response.data.bookings);
        await setLoading(false);
        setSuccess(true);
      })
      .catch(function (error) {
        setErr(true);
        setLoading(false);
        console.log(error);
      });
  };

  const fetchDataByDate = async () => {
    setbookings([]);
    setLoading(true);
    setErr(false);
    //setSuccess(false);
    var config = {
      method: "get",
      url: `${SERVER_URL}/api/bookings/skip/0/limit/30?hotel=${hotel}&startDate=${startDate}&endDate=${endDate}&status=${filter}`,
      headers: {
        Authorization: `${token}`,
      },
      timeout: 5000,
    };

    await axios(config)
      .then(async (response) => {
        console.log(response.data.bookings);
        await setbookings(response.data.bookings);
        await setLoading(false);
        setSuccess(true);
      })
      .catch(function (error) {
        setErr(true);
        setLoading(false);
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
        return (
          <Stack direction="row" spacing={0}>
            <Tooltip title="Check in">
              <IconButton>
                <AssignmentTurnedInIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            {/***
           * <Button
              size="small"
              disableElevation
              variant="contained"
              color="success"
              sx={{
                ...btnStyle,
                width: "110px",
                borderRadius: "15px",

                "&.MuiButton-root": {
                  width: "100px",
                  fontFamily: `${font.LAO_FONT}`,
                },
              }}
            >
              ແຈ້ງເຂົ້າ
            </Button>
            <Button
              size="small"
              disableElevation
              variant="contained"
              color="success"
              sx={{
                ...btnStyle,
                width: "110px",
                borderRadius: "15px",

                "&.MuiButton-root": {
                  width: "100px",
                  fontFamily: `${font.LAO_FONT}`,
                },
              }}
            >
              ຍົກເລີກລາຍການ
            </Button>
 */}
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
      field: "Agency",
      headerName: "Agency",
      width: 80,
      renderCell: (parram) => {
        if (!parram.row.onlineCustomer) {
          return <>STAFF</>;
        }
        return (
          <>
            {parram.row.onlineCustomer.firstName}{" "}
            {parram.row.onlineCustomer.lastName}
          </>
        );
      },
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
        const date = useFormatDate(params.row.createdAt);
        return <span>{date}</span>;
      },
    },

    //{
    //  field: "note",
    //  headerName: "ລາຍລະອຽດ",
    //  type: "number",
    //  flex: 1.2,
    //  sortable: false,
    //
    //
    //},
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
                ລໍຖ້າແຈ້ງເຂົ້າ
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: `${font.LAO_FONT}` }}
                value="CHECKIN"
              >
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
          <Stack direction='column' justifyContent='flex-end' >
            <Button
            color="success"
            variant="contained"
            disableElevation
              sx={{
                ...btnStyle,
                marginLeft: '10px',
                width: '100px'
              }}
              onClick={fetchDataByDate}
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
          rows={bookings}
          columns={columns}
          disableSelectionOnClick
          getRowId={(row) => row._id}
          loading={loading}
        />
      </div>
    </Stack>
  );
}
