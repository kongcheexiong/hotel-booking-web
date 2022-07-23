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
} from "@mui/material";

import SearchArea from "./SearchArea";

import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { Chip } from "@mui/material";

import { font } from "../../../constants/index";
import { datagridSx } from "../../../style";
import { useFormatDate } from "../../../services/formateDate";
import { counterContext } from "../../../context/counter";
import { roomContext } from "../../../context/room.context";

import EditForm from "./EditForm";
import { SERVER_URL } from "../../../constants/index";

import { textStyle } from "../../../style";

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

              deleteUser({
                room: "" + parram.row._id,
                roomtype: "" + parram.row.roomType._id,
              });
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
  //const [imgSrc, setImgSrc] = React.useState([]);
  const [sortModel, setSortModel] = React.useState([
    {
      field: "updatedAt",
      sort: "desc",
    },
  ]);

  const fetchData = async () => {
    setRoom([])
    setloading(true);

    var config = {
      method: "get",
      url: `${SERVER_URL}/api/rooms/skip/0/limit/30?hotelId=${hotelID}`,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 5000,
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
  const deleteUser = async ({ room = "", roomtype = "" }) => {
    var config = {
      method: "delete",
      url: `${SERVER_URL}/api/delete/room`,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 5000,
      data: {
        id: room,
        roomType: roomtype,
      },
    };

    axios(config)
      .then((res) => {
        console.log(res.data);
        setValue((value) => value + 1);
        alert("Deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  React.useEffect(() => {
    fetchData();
    console.log(hotelID);
    console.log(resData);
  }, [value]);

  const [pageSize, setPageSize] = React.useState(10);

  const [search, setSearch] = React.useState("");
  const hotel = localStorage.getItem("hotel");

  const fetchDataById = async () => {
    // setRoom({ ...room, roomLoading: true, roomErr: false, roomSuccess: false });
    await axios
      .get(`${SERVER_URL}/api/room?hotelId=${hotel}&roomName=${search}`, {
        timeout: 5000,
      })
      .then((res) => {
        setRoom(res.data);
        console.log(room);
      })
      .catch((err) => {
        console.error(err);
        alert(err);
      });
  };

  return (
    <div>
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
            placeholder="ຊື່ປະເພດຫ້ອງ"
            sx={{ ...textStyle, width: 200 }}
            onChange={(e) => {
              e.preventDefault();
              setSearch(e.target.value);
              if (search === "") {
                fetchData();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setRoom({});
                if (search === "") {
                  fetchData();
                  return;
                }
                fetchDataById();
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
      </div>
    </div>
  );
}
