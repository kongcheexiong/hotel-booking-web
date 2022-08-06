import * as React from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import {
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  DialogActions,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

import SearchArea from "./SearchArea";

import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { Chip } from "@mui/material";

import { font } from "../../../constants/index";
import { datagridSx, btnStyle } from "../../../style";
import { useFormatDate } from "../../../services/formateDate";
import { counterContext } from "../../../context/counter";
import { roomContext } from "../../../context/room.context";

import EditForm from "./EditForm";
import { SERVER_URL } from "../../../constants/index";

import { textStyle } from "../../../style";
import { PrintContext } from "../../../context/print.context";

const rows = [{ _id: 1, roomNumber: "F01", type: "VIP 1", isAvailable: true }];

export default function PageSizeCustomOptions() {
  //const roomType = React.useContext(roomTypeContext)
  const [editOpen, setEditOpen] = React.useState(false);
  const handleOpenEditForm = () => setEditOpen(!editOpen);
  const [updatedData, setUpdatedData] = React.useState();

  const { room, setRoom } = React.useContext(roomContext);
  const { value, setValue } = React.useContext(counterContext);

  const hotelID = localStorage.getItem("hotel");
  const [count, setCount] = React.useState(0);

  //const [roomData, setRoomData] = React.useState([]);
  const [rooms, setRooms] = React.useState();

  const [resData, setResData] = React.useState();
  //const [dataRows, setDataRows] = React.useState([]);
  const [error, setError] = React.useState(false);

  const [isLoading, setloading] = React.useState(true);

  const [selectedRoomType, setSelectedRoomType] = React.useState("none");
  //const [imgSrc, setImgSrc] = React.useState([]);

  const [deleteId, setDeleteId] = React.useState({});
  const [popUpConfirm, setPopUpConfirm] = React.useState(false);
  const [roomType, setRoomType] = React.useState([]);

  const { Print, setPrint } = React.useContext(PrintContext);

  const [sortModel, setSortModel] = React.useState([
    {
      field: "updatedAt",
      sort: "desc",
    },
  ]);

  const fetchData = async () => {
    setPrint([]);

    setRoom([]);
    setloading(true);

    var config = {
      method: "get",
      url: `${SERVER_URL}/api/rooms/skip/0/limit/30?hotelId=${hotelID}`,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 40000,
    };

    await axios(config)
      .then((response) => {
        setRoom(response.data.rooms);

        setloading(false);
        setError(false);
      })
      .catch(function (error) {
        console.log(error);
        setError(true);
        setloading(false);
      });
  };
  const deleteUser = async () => {
    var config = {
      method: "delete",
      url: `${SERVER_URL}/api/delete/room`,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 40000,
      data: {
        id: deleteId.room,
        roomType: deleteId.roomtype,
      },
    };

    axios(config)
      .then((res) => {
        console.log(res.data);
        setValue((value) => value + 1);
        //alert("Deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };
  const fetchAllRoomType = async () => {
    await axios
      .get(`${SERVER_URL}/api/room-types/skip/0/limit/30?hotelId=${hotelID}`, {
        timeout: 40000,
      })
      .then(async (res) => {
        await setRoomType(res.data.roomTypes);
        // await console.log(roomType);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  React.useEffect(() => {
    fetchData();
    fetchAllRoomType();
    console.log(hotelID);
    console.log(resData);
  }, [value]);

  const [pageSize, setPageSize] = React.useState(10);

  const [search, setSearch] = React.useState("");
  const hotel = localStorage.getItem("hotel");
  const [status, setStatus] = React.useState("none");

  const fetchDataById = async (data) => {
    setRoom([]);
    setloading(true);
    // setRoom({ ...room, roomLoading: true, roomErr: false, roomSuccess: false });
    await axios
      .get(`${SERVER_URL}/api/room?hotelId=${hotel}&roomName=${data}`, {
        timeout: 40000,
      })
      .then((res) => {
        setRoom(res.data);
        setPrint(res.data);
        console.log(room);
        setloading(false);
      })
      .catch((err) => {
        console.error(err);
        alert(err);
      });
  };

  const fetchDataByType = async (roomType = "none", status = "none") => {
    setloading(true);
    setRoom([]);
    if (selectedRoomType !== "none" && status !== "none") {
      await axios
        .get(
          `${SERVER_URL}/api/rooms-by-room-type?roomType=${roomType}&status=${status}&hotelId=${hotel}`
        )
        .then((res) => {
          setloading(false);
          console.log(res.data);
          setRoom(res.data.rooms);
        })
        .catch((err) => console.error(err));
    } else if (selectedRoomType !== "none") {
      await axios
        .get(
          `${SERVER_URL}/api/rooms-by-room-type?roomType=${roomType}&hotelId=${hotel}`
        )
        .then((res) => {
          setloading(false);
          console.log(res.data);
          setRoom(res.data.rooms);
        })
        .catch((err) => console.error(err));
    } else if (status !== "none") {
      await axios
        .get(
          `${SERVER_URL}/api/rooms-by-room-type?status=${status}&hotelId=${hotel}`
        )
        .then((res) => {
          setloading(false);
          console.log(res.data);
          setRoom(res.data.rooms);
        })

        .catch((err) => console.error(err));
    }else{
      await axios
        .get(
          `${SERVER_URL}/api/rooms-by-room-type?&hotelId=${hotel}`
        )
        .then((res) => {
          setloading(false);
          console.log(res.data);
          setRoom(res.data.rooms);
        })

        .catch((err) => console.error(err));
    }
  };

  const columns = [
    {
      field: "action",
      headerName: "ຕົວເລືອກ",
      width: 100,
      sortable: false,
      renderCell: (parram) => {
        return (
          <div>
            <IconButton
              onClick={() => {
                console.log({
                  room: "" + parram.row._id,
                  roomtype: "" + parram.row.roomType._id,
                });
                setDeleteId({
                  room: parram.row._id,
                  roomtype: parram.row.roomType._id,
                });
                setPopUpConfirm(true);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => {
                console.log(parram.row);
                setUpdatedData(parram.row);
                handleOpenEditForm();
                //console.log(resData);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </div>
        );
      },
    },
    { field: "_id", headerName: "ລະຫັດ", width: 80 },
    { field: "roomName", headerName: "ເບີຫ້ອງ", width: 90, sortable: false },
    {
      field: "roomType",
      headerName: "ປະເພດຫ້ອງ",
      flex: 1,
      renderCell: (params) => {
        return params.row.roomType ? (
          <span>{params.row.roomType.typeName}</span>
        ) : (
          <span>Unknown</span>
        );
      },
    },
    { field: "note", headerName: "ລາຍລະອຽດ", flex: 1, sortable: false },
    {
      field: "updatedAt",
      headerName: "ວັນທີສ້າງລາຍການ",
      flex: 1,
      renderCell: (params) => {
        const formated_date = params.row.updatedAt;
        const date = useFormatDate(formated_date);

        return <span>{date}</span>;
      },
    },

    {
      field: "status",
      headerName: "ສະຖານະ",
      type: "boolean",
      flex: 1,
      renderCell: (parram) => {
        if (!parram.row.status) {
          return (
            <Chip
              sx={{ fontFamily: "Noto Sans Lao", width: "60px" }}
              color="success"
              label="ຫວ່່າງ"
            />
          );
        }
        return (
          <Chip
            sx={{ fontFamily: "Noto Sans Lao", width: "60px" }}
            color="error"
            label="ບໍ່ຫວ່່າງ"
          />
        );
      },
    },
  ];

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Stack>
          <label>ຄົ້ນຫາຕາມປະເພດຫ້ອງ</label>
          <Select
            sx={{
              ...textStyle,
              fontFamily: `${font.LAO_FONT}`,
              height: 35,
              width: `200px`,
            }}
            value={selectedRoomType}
            onChange={(e) => {
              e.preventDefault();
              setSelectedRoomType(e.target.value);
            }}
            variant="outlined"
          >
            <MenuItem sx={{ fontFamily: `${font.LAO_FONT}` }} value="none">
              {`none`}
            </MenuItem>

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
        <Stack>
          <label>ສະຖານະ</label>
          <Select
            sx={{
              ...textStyle,
              fontFamily: `${font.LAO_FONT}`,
              height: 35,
              width: `150px`,
            }}
            value={status}
            onChange={(e) => {
              e.preventDefault();
              setStatus(e.target.value);
            }}
            variant="outlined"
          >
            <MenuItem sx={{ fontFamily: `${font.LAO_FONT}` }} value={"none"}>
              {"none"}
            </MenuItem>
            <MenuItem sx={{ fontFamily: `${font.LAO_FONT}` }} value={false}>
              {"ຫວ່າງ"}
            </MenuItem>
            <MenuItem sx={{ fontFamily: `${font.LAO_FONT}` }} value={true}>
              {"ບໍຫວ່າງ"}
            </MenuItem>
          </Select>
        </Stack>
        <Stack justifyContent="flex-end">
          <Button
            onClick={() => {
              fetchDataByType(selectedRoomType, status);
            }}
            variant="contained"
            disableElevation
            sx={{ ...btnStyle, height: "35px" }}
          >
            {" "}
            ຄັ້ນຫາ
          </Button>
        </Stack>
      </Stack>
      <br />
      <Divider />
      <Stack
        direction="row"
        spacing={1}
        justifyContent="flex-end"
        alignItems="center"
      >
        {/**search */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ marginTop: "20px" }}
        >
          <label>ຄົ້ນຫາ:</label>
          <TextField
            placeholder="ເບີຫ້ອງ"
            sx={{ ...textStyle, width: 200 }}
            onChange={(e) => {
              e.preventDefault();
              setSearch(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (e.target.value === "") {
                  fetchData();
                  return;
                }
                fetchDataById(e.target.value);
              }
            }}
          />
        </Stack>
        {/**end of search */}
      </Stack>
      <div style={{ height: 660, width: "100%" }}>
        {/**table */}
        <DataGrid
          sx={{ ...datagridSx, marginTop: "10px" }}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          rows={room}
          columns={columns}
          disableSelectionOnClick
          disableColumnMenu
          getRowId={(row) => row._id}
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          loading={isLoading}
          //error={error}
        />
        {/**show update form */}
        <Dialog
          open={editOpen}
          onClose={handleOpenEditForm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <EditForm updatedData={updatedData} />
          </DialogContent>
        </Dialog>
        {/**show confirm dialog */}
        <Dialog
          fullWidth
          maxWidth="xs"
          open={popUpConfirm}
          onClose={() => setPopUpConfirm(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            style={{
              " & .MuiDialogTitle-root": {
                fontFamily: `${font.LAO_FONT}`,
              },
            }}
            id="alert-dialog-title"
          >
            <span
              style={{
                fontFamily: `${font.LAO_FONT}`,
              }}
            >
              ຢືນຢັນ
            </span>
          </DialogTitle>
          <DialogContent>
            <span
              style={{
                fontFamily: `${font.LAO_FONT}`,
              }}
            >
              ທ່ານຕ້ອງແກ້ລົບລາຍການນີ້ແທ້ບໍ?{" "}
            </span>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ ...btnStyle }}
              onClick={() => {
                setPopUpConfirm(false);
                if (deleteId.room && deleteId.roomtype) {
                  deleteUser();
                  setValue(() => value + 1);
                }
              }}
            >
              ຕົກລົງ
            </Button>
            <Button sx={{ ...btnStyle }} onClick={() => setPopUpConfirm(false)}>
              ຍົກເລີກ
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
