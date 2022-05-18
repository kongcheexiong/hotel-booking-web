import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import axios from "axios";

import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";

import { font } from "../../../constants/index";
import { Construction } from "@mui/icons-material";

export default function PageSizeCustomOptions() {
 
  const hotelID = localStorage.getItem("hotel");

  const [roomData, setRoomData] = React.useState([]);
  const [row, setrow] = React.useState([]);
  const [url, setUrl] = React.useState(
    `http://localhost:8080/api/room-types/skip/0/limit/30?hotelId=${hotelID}`
  );

  const [resData, setResData] = React.useState([]);
  const [dataRows, setDataRows] = React.useState([]);
  const responseData = [{}];
  const [isLoading, setloading] = React.useState(true);

  const fetchData = async () => {
    await axios
      .get(
        `http://localhost:8080/api/room-types/skip/0/limit/30?hotelId=${hotelID}`
      )
      .then((res) => {
        setResData(res.data.roomTypes);
        setloading(false);
        
      })
      .catch((err) => console.error(err));
    console.log(resData);
  };

  React.useEffect(() => {
    //setResData([])
    setloading(true);
    setRoomData([]);
    setResData([]);
    fetchData();
    
    
  }, []);

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
            <IconButton>
              <DeleteIcon fontSize="small" />
            </IconButton>

            <IconButton
              onClick={() => {
                console.log(roomData);
                console.log(resData);
                console.log(parram.row);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </div>
        );
      },
    },
    { field: "_id", headerName: "ລະຫັດ", width: 80 },
    { field: "typeName", headerName: "ຊື່ປະເພດຫ້ອງ", flex: 1, sortable: false },
    { field: "price", headerName: "ລາຄາ", flex: 1 },
    {
      field: "numberOfBed",
      headerName: "ຈໍານວນຕຽງ",
      type: "number",
      flex: 1,
    },
    {
      field: "suggestedGuestAllowed",
      headerName: "ຈໍານວນລູກຄ້າແນະນໍາ",
      type: "number",
      flex: 1,
    },
    {
      field: "note",
      headerName: "ໝາຍເຫດ",
      type: "number",
      flex: 1.5,
      sortable: false,
    },
  ];
/**  const rows = [
    {
      _id: 1,
      roomType: "VIP01",
      price: "1,000",
      numberOfBed: 2,
      suggestedGuestAllowed: 2,
      note: "ຫ້ອງແອ, ບໍລິການອາຫານເຊົ້າ",
    },
    {
      _id: 2,
      roomType: "VIP02",
      price: "1,000",
      numberOfBed: 2,
      suggestedGuestAllowed: 2,
      note: "ຫ້ອງແອ, ບໍລິການອາຫານເຊົ້າ",
    },
  ];*/
 

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
      // borderRadius: 2
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
    <div style={{ height: 650, width: "100%" }}>
      {isLoading ? (
        <h1>loading</h1>
      ) : (
        <DataGrid
          sx={{ ...datagridSx }}
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
      )}
    </div>
  );
}