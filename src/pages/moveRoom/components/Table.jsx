import {
  Stack,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Select,
  DialogTitle,
  Divider,
  Tooltip,
} from "@mui/material";
import React from "react";
import { textStyle, btnStyle, datagridSx } from "../../../style";
import { font, SERVER_URL, color, router } from "../../../constants";

//icon
import SearchIcon from "@mui/icons-material/Search";

import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { CheckInContextContext } from "../../../context/checkin.context";
import { counterContext } from "../../../context/counter";

import LogoutIcon from "@mui/icons-material/Logout";

import { format } from "date-fns";
import CancelIcon from "@mui/icons-material/Cancel";

import { GridAddIcon } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
//icon
import CachedIcon from "@mui/icons-material/Cached";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import { PrintComponent } from "./PrintComponent";

import { useReactToPrint } from "react-to-print";

import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { TrendingUpRounded } from "@mui/icons-material";

export default function Table() {
  const [pageSize, setPageSize] = React.useState(10);
  const { CheckInContext, setCheckInContext } = React.useContext(
    CheckInContextContext
  );
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const { value, setValue } = React.useContext(counterContext);
  const [MoveData, setMoveData] = React.useState();
  const [filter, setFilter] = React.useState("ALL");
  const [bookingSearchPhone, setbookingsSearchPhone] = React.useState([]);
  const [phoneSearch, setPhoneSearch] = React.useState(false);

  const hotel = localStorage.getItem("hotel");
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [isOpenMove, setIsOpenMove] = React.useState(false);

  const [selectedRoomType, setSelectedRoomType] = React.useState("");
  const [selectedRoom, setSelectedRoom] = React.useState("");
  const [roomType, setRoomType] = React.useState([]);
  const [rooms, setRooms] = React.useState([]);

  const [loadingRoom, setLoadingRoom] = React.useState(false);

  const fetchAllRoomType = async () => {
    await axios
      .get(`${SERVER_URL}/api/room-types/skip/0/limit/30?hotelId=${hotel}`, {
        timeout: 40000,
      })
      .then(async (res) => {
        await setRoomType(res.data.roomTypes);
        console.log(res.data.roomTypes);
        // await console.log(roomType);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchCheckIn = async () => {
    setCheckInContext([]);
    setLoading(true);
    axios
      .get(
        `${SERVER_URL}/api/check-in-data/skip/0/limit/100?hotel=${localStorage.getItem(
          "hotel"
        )}&isCheckOut=false`
      )
      .then((res) => {
        console.log(res.data);
        setCheckInContext(res.data.checkIns);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };
  const fetchRoomsData = async (type) => {
    // var id = location.state.roomType._id;
    setLoadingRoom(true);
    const res = await fetch(
      `${SERVER_URL}/api/rooms-by-room-type?roomType=${type}&status=false`
    );
    const data = await res.json();
    setRooms(data);
    setLoadingRoom(false);
  };
  const [loadingMove, setLoadingMove] = React.useState(false)

  const moveRoom = () => {
    setLoadingMove(true)
    axios
      .put(`${SERVER_URL}/api/move-room?checkInId=${MoveData._id}&room=${selectedRoom}`)
      .then((res) => {
        setLoadingMove(false)
        console.log(res.data)})
        alert('move successfully')
        setValue(value=>value+1)
      .catch((err) => console.log(err));
  };

  const handleSelectRoomType = async (e) => {};

  const handleSelectRoom = async (e) => {
    await setSelectedRoom(e.target.value);
  };

  // React.useEffect(() => {
  //   fetchCheckIn();
  //   setIsOpenMove(false)
  // }, [value]);

  React.useEffect(() => {
    fetchAllRoomType();
    fetchCheckIn();
    setIsOpenMove(false);
  }, [value]);

  const columns = [
    {
      field: "action",
      headerName: "ຕົວເລືອກ",
      width: 100,
      sortable: false,
      renderCell: (parram) => {
        return (
          <div>
            <Tooltip title={"ຍ້າຍຫ້ອງ"}>
              <IconButton
                onClick={() => {
                  setMoveData(parram.row);
                  console.log(parram.row);
                  setIsOpenMove(true);
                  setSelectedRoom("");
                  setSelectedRoomType("");
                  setRooms([]);
                }}
              >
                <ModeEditOutlineIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
    { field: "billId", headerName: "ລະຫັດ", width: 80 },
    {
      field: "roomName",
      headerName: "ຫ້ອງ",
      width: 80,
      renderCell: (param) => {
        return <span> {param.row.room?.roomName}</span>;
      },
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
        if (params.row?.checkInDate && params.row?.MoveDate) {
          const start = format(new Date(params.row?.checkInDate), "dd/MM/yyy");
          const end = format(new Date(params.row?.MoveDate), "dd/MM/yyy");

          return (
            <Stack>
              <span>{`${start}`}</span>
              <span>{`${end} `}</span>
            </Stack>
          );
          return <></>;
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

  return (
    <>
      <Stack direction="column" spacing={3}>
        {/** action button */}
        <Stack direction="row" spacing={2}>
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
        </Stack>
        <Divider />
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
              } else {
                setPhoneSearch(false);
              }

              let filtered = CheckInContext.filter((b) => {
                return (
                  b.room?.roomName.includes(e.target.value)
                );
              });
              setbookingsSearchPhone(filtered);
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
        {/**Move dialog */}
        <Dialog
          open={isOpenMove}
          onClose={() => {
            setIsOpenMove(false);
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
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <span>{"ຍ້າຍຫ້ອງ"}</span>

              <IconButton
                onClick={() => {
                  setIsOpenMove(false);
                }}
              >
                <CancelIcon fontSize="" />
              </IconButton>
            </Stack>
          </DialogTitle>
          <DialogContent>
            {/* <MoveComponent data={MoveData} /> */}
            <Stack spacing={2} sx={{ width: "300px" }}>
              <Stack>
                <label>ເລືອກປະເພດຫ້ອງ</label>
                <Select
                  sx={{
                    ...textStyle,
                    fontFamily: `${font.LAO_FONT}`,
                    height: 35,
                    width: `100%`,
                  }}
                  value={selectedRoomType}
                  onChange={async (e) => {
                    await setSelectedRoomType(e.target.value);
                    await setSelectedRoom("");
                    await fetchRoomsData(e.target.value);
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
              {loadingRoom ? <span>Loading...</span> : null}
              {selectedRoomType !== "" ? (
                <Stack>
                  <label>ເລືອກຫ້ອງ</label>
                  {/*<ShowRoom room={room} />*/}
                  <Select
                    sx={{
                      ...textStyle,
                      fontFamily: `${font.LAO_FONT}`,
                      height: 35,
                      width: `100%`,
                    }}
                    value={selectedRoom}
                    onChange={async (e) => {
                      await setSelectedRoom(e.target.value);
                    }}
                    variant="outlined"
                  >
                    {rooms?.map((val, idx) => {
                      return (
                        <MenuItem
                          key={idx}
                          sx={{ fontFamily: `${font.LAO_FONT}` }}
                          value={val._id}
                        >
                          {val.roomName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Stack>
              ) : null}
              <Stack>
                {loadingMove? <span>Loading...</span>: null}
                <Button
                  onClick={() => {
                    if(loadingMove) return
                    if (selectedRoomType === "" && selectedRoom === "")
                      return null;
                    moveRoom()
                  }}
                  variant="contained"
                  sx={{ ...btnStyle, width: "100%" }}
                >
                  ຢືນຢັນ
                </Button>
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </Stack>
    </>
  );
}
