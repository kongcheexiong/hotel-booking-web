import { Stack, TextField, MenuItem, Button, IconButton, Dialog, DialogContent, DialogActions, Select, DialogTitle } from "@mui/material";
import React from "react";
import { textStyle, btnStyle, datagridSx } from "../../../style";
import { font, SERVER_URL, color, router } from "../../../constants";
import CheckOutComponent from "./checkOut.component";

//icon
import SearchIcon from "@mui/icons-material/Search";

import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { CheckInContextContext } from "../../../context/checkin.context";
import { counterContext } from "../../../context/counter";

import LogoutIcon from '@mui/icons-material/Logout';

import { format } from 'date-fns'
import CancelIcon from "@mui/icons-material/Cancel";

import { GridAddIcon } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
//icon
import CachedIcon from "@mui/icons-material/Cached";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import { PrintComponent } from "./PrintComponent";

import { useReactToPrint } from "react-to-print";

export default function Table() {
  const [pageSize, setPageSize] = React.useState(10);
  const { CheckInContext, setCheckInContext } = React.useContext(
    CheckInContextContext
  );
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true)
  const { value, setValue } = React.useContext(counterContext);
  const [checkOutData, setCheckOutData] = React.useState()
  const [filter, setFilter] = React.useState("ALL");
  const [bookingSearchPhone, setbookingsSearchPhone] = React.useState([]);
  const [phoneSearch, setPhoneSearch] = React.useState(false);

  const hotel = localStorage.getItem("hotel");
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [isOpenCheckout, setIsOpenCheckout] = React.useState(false)

  const fetchCheckIn = async () => {
    setCheckInContext([])
    setLoading(true)
    axios
      .get(`${SERVER_URL}/api/check-in-data/skip/0/limit/100?hotel=${localStorage.getItem('hotel')}`)
      .then((res) => {
        console.log(res.data);
        setCheckInContext(res.data.checkIns);
        setLoading(false)
      })
      .catch((err) => console.error(err));
  };

  const searchCheckInData = async () => {
    setCheckInContext([]);

    setLoading(true);
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
        await setLoading(false);
        // setSuccess(true);
      })
      .catch(function (error) {
        // setErr(true);
        // setLoading(false);
        console.log(error);
      });
  };


  // React.useEffect(() => {
  //   fetchCheckIn();
  //   setIsOpenCheckout(false)
  // }, [value]);

  React.useEffect(() => {
    fetchCheckIn();
    setIsOpenCheckout(false)
  }, []);

  const columns = [
    {
      field: "action",
      headerName: "ຕົວເລືອກ",
      width: 100,
      sortable: false,
      renderCell: (parram) => {
        return (
          <div>
            <IconButton onClick={() => {
              setCheckOutData(parram.row)
              console.log(parram.row)
              setIsOpenCheckout(true)
            }}>
              <LogoutIcon fontSize="small" />
            </IconButton>

          </div>
        );
      },
    },
    { field: "billId", headerName: "ລະຫັດ", width: 80 },
    {
      field: "roomName", headerName: "ຫ້ອງ", width: 80, renderCell: param => {
        return <span> {param.row.room?.roomName}</span>

      }
    },
    {
      field: "gender",
      headerName: "ເພດ",
      flex: 1,
    },
    {
      field: "firstName",
      headerName: "ຊື່",
      flex: 1,
      sortable: false,
    },
    { field: "lastName", headerName: "ນາມສະກຸນ", flex: 0.5 },
    {
      field: "phone",
      headerName: "ເບີໂທລະສັບ",
      type: "number",
    },
    {
      field: "reference",
      headerName: "ເອກະສານອ້າງອີງ",
      flex: 1,
      //renderCell: (parram) => {
      //  return (
      //    <div>
      //      {parram.row.roomType.suggestedGuestAllowed}
      //    </div>
      //  );
      //},
    },
    {
      field: "verify",
      headerName: "ເລກທີ",

      flex: 1,
    },
    {
      field: "checkInDate",
      headerName: "ໄລຍະເວລາ",
      flex: 1,
      renderCell: (params) => {
        if (params.row?.checkInDate && params.row?.checkOutDate) {
          const start = format(new Date(params.row?.checkInDate), 'dd/MM/yyy')
          const end = format(new Date(params.row?.checkOutDate), 'dd/MM/yyy')

          return (
            <Stack>
              <span>{`${start}`}</span>
              <span>{`${end} `}</span>
            </Stack>

          );
          return <></>

        }

      },
    },
    //{
    //  field: "checkedInBy",
    //  headerName: "ແຈ້ງເຂົ້າໂດຍ",
    //  flex: 1,
    //},

    {
      field: "isCheckOut",
      headerName: "ແຈ້ງອອກ",
      type: "boolean",
      flex: 0.5,
      //renderCell: (params) => {
      //  const date = useFormatDate(params.row.roomType.updatedAt);
      //  return <span>{date}</span>;
      //},
    },
    {
      field: "isPaid",
      headerName: "ຈ່າບແລ້ວ",
      type: "boolean",
      flex: 0.5,
    },
  ];
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
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
              fetchCheckIn();
            }}
          >
            Reload
          </Button>
          <div
            style={{ display: "none" }}// This make ComponentToPrint show   only while printing
          >
            <PrintComponent ref={componentRef} />
          </div>

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
              handlePrint()

            }}
          >
            ລາຍງານຂໍ້ມູນ
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
      <Stack direction="column">
        {/**search textfield */}
        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={1}
          alignItems="center"
        >
          <span>ຄັ້ນຫາ :</span>
          <TextField
            placeholder="ເບີຫ້ອງ"
            variant="outlined"
            sx={{ ...textStyle, width: "200px", backgroundColor: "white" }}
            onChange={(e) => {

              if (e.target.value !== "") {
                setPhoneSearch(true);
              } else { setPhoneSearch(false) }

              let filtered = CheckInContext.filter(b => {
                return b.room?.roomName.includes(e.target.value) && b.isCheckOut === false
              });
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
        <div style={{ height: 660, width: "100%" }}>
          <DataGrid
            sx={{ ...datagridSx, marginTop: "10px" }}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            rows={phoneSearch ? bookingSearchPhone : CheckInContext}
            columns={columns}
            disableSelectionOnClick
            getRowId={(row) => row._id}
            loading={loading}
          />
        </div>
        {/**checkout dialog */}
        <Dialog
          open={isOpenCheckout}
          onClose={() => {
            setIsOpenCheckout(false)

          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            sx={{
              fontFamily: "Noto sans lao",
              fontSize: "18px",
              backgroundColor: `${color.BLUE_COLOR}`,
              fontWeight: 500,
              color: "white",
            }}
            id="add-new-type"
          >
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
              <span>{"ຢືນຢັນການແຈ້ງອອກ"}</span>

              <IconButton onClick={() => setIsOpenCheckout(false)}>
                <CancelIcon fontSize="" />
              </IconButton>


            </Stack>

          </DialogTitle>
          <DialogContent>

            <CheckOutComponent data={checkOutData} />


          </DialogContent>
          <DialogActions>


          </DialogActions>
        </Dialog>
      </Stack></>
  );
}
