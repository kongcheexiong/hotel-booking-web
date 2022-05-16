import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";

import {font} from '../../../constants/index'
 
export default function PageSizeCustomOptions() {

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
                console.log(parram.row);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </div>
        );
      },
    },
    { field: "id", headerName: "ລະຫັດ", width: 80 },
    { field: "roomType", headerName: "ຊື່ປະເພດຫ້ອງ", flex: 1,sortable: false, },
    { field: "price", headerName: "ລາຄາ",  flex: 1},
    {
      field: "numOfBed",
      headerName: "ຈໍານວນຕຽງ",
      type: "number",
      flex: 1 
    },
    {
        field: "numOfQuest",
        headerName: "ຈໍານວນລູກຄ້າແນະນໍາ",
        type: "number",
        flex: 1
      },
      {
        field: "note",
        headerName: "ໝາຍເຫດ",
        type: "number",
        flex: 1.5,
        sortable: false,
       
      },

  ];

  const rows = [
      {id: 1, roomType: 'VIP01', price: '1,000', numOfBed: 2, numOfQuest: 2, note: 'ຫ້ອງແອ, ບໍລິການອາຫານເຊົ້າ'},
      {id: 2, roomType: 'VIP02', price: '1,000', numOfBed: 2, numOfQuest: 2, note: 'ຫ້ອງແອ, ບໍລິການອາຫານເຊົ້າ'},
      {id: 3, roomType: 'fsd', price: '1,000', numOfBed: 2, numOfQuest: 2, note: 'ຫ້ອງແອ, ບໍລິການອາຫານເຊົ້າ'},
      {id: 4, roomType: 'fgfd', price: '1,000', numOfBed: 2, numOfQuest: 2, note: 'ຫ້ອງແອ, ບໍລິການອາຫານເຊົ້າ'},
      {id: 5, roomType: 'wr', price: '1,000', numOfBed: 2, numOfQuest: 2, note: 'ຫ້ອງແອ, ບໍລິການອາຫານເຊົ້າ'},
      {id: 6, roomType: 'gh', price: '1,000', numOfBed: 2, numOfQuest: 2, note: 'ຫ້ອງແອ, ບໍລິການອາຫານເຊົ້າ'},
      {id: 7, roomType: 'hgfb', price: '1,000', numOfBed: 2, numOfQuest: 2, note: 'ຫ້ອງແອ, ບໍລິການອາຫານເຊົ້າ'},
      {id: 8, roomType: 'dfhre', price: '1,000', numOfBed: 2, numOfQuest: 2, note: 'ຫ້ອງແອ, ບໍລິການອາຫານເຊົ້າ'},
      {id: 9, roomType: 'rgfd', price: '1,000', numOfBed: 2, numOfQuest: 2, note: '"ຫ້ອງແອ, ບໍລິການອາຫານເຊົ້າ'},
      {id: 10, roomType: 'jukyk', price: '1,000', numOfBed: 2, numOfQuest: 2, note: 'ຫ້ອງແອ, ບໍລິການອາຫານເຊົ້າ'},

  ]
  const datagridSx = {
    //borderRadius: 2,
    fontFamily: `${font.LAO_FONT}`,
    '& .MuiDataGrid-cell':{
        backgroundColor: "",
        padding: '6px 10px',
       
      
        borderWidth: 1,
        borderColor: "#F8F9FA",
        borderStyle: "solid",
    },
    

    "& .MuiDataGrid-main": { 
       // borderRadius: 2 
    },
    "& .MuiDataGrid-virtualScrollerRenderZone": {
      "& .MuiDataGrid-row": {
        "&:nth-child(2n)": { backgroundColor: "rgba(235, 235, 235, .2)" }
      }
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#1565C0",
      color: "white",
     

      
     
    }
  };



  return (
    <div style={{ height: 650, width: "100%" }}>
      <DataGrid
      sx={{...datagridSx}}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        rows={rows}
        columns={columns}
       
        disableSelectionOnClick
       
       disableColumnMenu
     

      />
    </div>
  );
}
