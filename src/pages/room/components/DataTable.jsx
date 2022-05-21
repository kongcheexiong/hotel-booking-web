import * as React from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { Chip } from "@mui/material";

import { font } from "../../../constants/index";

export default function PageSizeCustomOptions() {
 
  //const roomType = React.useContext(roomTypeContext)

  
  const hotelID = localStorage.getItem("hotel");
  //const [count, setCount] = React.useState(0);

  //const [roomData, setRoomData] = React.useState([]);

  const [resData, setResData] = React.useState([]);
  //const [dataRows, setDataRows] = React.useState([]);
  const [error, setError] = React.useState(false);

  const [isLoading, setloading] = React.useState(true);
  //const [imgSrc, setImgSrc] = React.useState([]);



  const fetchData = async() => {
    setloading(true)
    var data = JSON.stringify({
      "hotelId": ''+hotelID
    });
    
    var config = {
      method: 'get',
      url: 'http://localhost:8080/api/rooms/skip/0/limit/30',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setloading(false)
        setResData(response.data.rooms)
      })
      .catch(function (error) {
        console.log(error);
        setError(true)
      });
  };

  React.useEffect(() => {

   fetchData()
   console.log(hotelID)
   console.log(resData)
    
  }, []);

  const [pageSize, setPageSize] = React.useState(10);
  const columns = [
    {
      field: "action",
      headerName: "ຕົວເລືອກ",
      width: 150,
      sortable: false,
      renderCell: (parram) => {
        return (
          <div>
            <IconButton
              onClick={() => {
                console.log(parram.row);
               // console.log(resData)
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        );
      },
    },
    { field: "_id", headerName: "ລະຫັດ", width: 80 },
    { field: "roomName", headerName: "ເບີຫ້ອງ", flex: 1, sortable: false },
    { field: "roomType", headerName: "ປະເພດຫ້ອງ", flex: 1 },
    {
      field: "status",
      headerName: "ສະຖານະ",
      type: "boolean",
      flex: 1,
      renderCell: (parram) => {
        if (parram.row.isAvailable) {
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
            label="ບໍຫວ່່າງ"
          />
        );
      },
    },
  ];

  const rows = [
    { _id: 1, roomNumber: "F01", type: "VIP 1", isAvailable: true },
  
  ];
  const datagridSx = {
    //borderRadius: 2,
    fontFamily: `${font.LAO_FONT}`,
    "& .MuiDataGrid-cell": {
      backgroundColor: "",
      padding: "6px 10px",

      borderWidth: 1,
      borderColor: "#F8F9FA",
      borderStyle: "solid",
    },

    "& .MuiDataGrid-main": {
      // borderRadius: 2
    },
    "& .MuiDataGrid-virtualScrollerRenderZone": {
      "& .MuiDataGrid-row": {
        "&:nth-child(2n)": { backgroundColor: "rgba(235, 235, 235, .2)" },
      },
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#1565C0",
      color: "white",
    },
  };

  return (
    <div>
    {error && <h1>there is an error in loading</h1>}
    {isLoading ? (
      <h1>Loading...</h1>
    ) : (
      <div style={{ height: 660, width: "100%" }}>
       
        <DataGrid
          sx={{ ...datagridSx, marginTop: '10px' }}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          rows={resData}
          columns={columns}
          disableSelectionOnClick
          disableColumnMenu
          getRowId={(row) => row._id}
        />
       
      </div>
    )}
  </div>
  );
}
