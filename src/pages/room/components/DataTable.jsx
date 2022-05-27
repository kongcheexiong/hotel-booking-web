import * as React from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { Chip } from "@mui/material";

import { font } from "../../../constants/index";
import { datagridSx } from "../../../style";
import { useFormatDate } from "../../../services/formateDate";
import { counterContext } from "../../../context/counter";

export default function PageSizeCustomOptions() {
  //const roomType = React.useContext(roomTypeContext)
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
      field: 'updatedAt',
      sort: 'desc'
    },
  ]);

  const fetchData = async () => {
    setloading(true);

    var config = {
      method: "get",
      url: `http://localhost:8080/api/rooms/skip/0/limit/30?hotelId=${hotelID}`,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 5000,
    };

    await axios(config)
      .then((response) => {
        //console.log(response.data);
        //setResData(response.data);
        setRooms(response.data.rooms);
        setloading(false);
        setError(false);
      })
      .catch(function (error) {
        console.log(error);
        setError(true);
        setloading(false);
      });

    {
     
    }
  };
  const deleteUser = async ({ room = "", roomtype = "" }) => {
    {
      /**await axios
      .delete("http://localhost:8080/api/delete/room",{
        id: room,
        roomType: roomtype
      },{
        timeout: 5000
      }

      )
      .then(res => {
        console.log(res.data);
        setValue((value)=> value+1)
        alert('Deleted successfully')
      })
      .catch(err => {
        console.log(err)
        alert(err)
      });
   */
    }
 

    var config = {
      method: "delete",
      url: "http://localhost:8080/api/delete/room",
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
    { field: "note", headerName: "ໝາຍເຫດ", flex: 1, sortable: false },
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

  const rows = [
    { _id: 1, roomNumber: "F01", type: "VIP 1", isAvailable: true },
  ];

  return (
    <div>
      {error && <h1>there is an error in loading</h1>}
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div style={{ height: 660, width: "100%" }}>
          <DataGrid
            sx={{ ...datagridSx, marginTop: "10px" }}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            rows={rooms}
            columns={columns}
            disableSelectionOnClick
            disableColumnMenu
            getRowId={(row) => row._id}
            sortModel={sortModel}
            onSortModelChange = {(model)=> setSortModel(model)}
          />
        </div>
      )}
    </div>
  );
}
