import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { Chip } from "@mui/material";

import {font} from '../../../constants/index'
 
export default function PageSizeCustomOptions() {

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
            }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>

           
          </div>
        );
      },
    },
    { field: "id", headerName: "ລະຫັດ", width: 80,  },
    { field: "roomNumber", headerName: "ເບີຫ້ອງ", flex: 1,sortable: false, },
    { field: "type", headerName: "ປະເພດຫ້ອງ",  flex: 1},
    {
      field: "isAvailable",
      headerName: "ສະຖານະ",
      type: "boolean",
      flex: 1 ,
      renderCell: (parram) => {
        if(parram.row.isAvailable){
          return <Chip sx={{  fontFamily: "Noto Sans Lao", width: '60px'}} color="success" label= 'ຫວ່່າງ' />
        }
        return <Chip sx={{  fontFamily: "Noto Sans Lao", width: '60px'}} color="error" label= 'ບໍຫວ່່າງ' />
      },

    },

  ];

  const rows = [
      {id: 1, roomNumber: 'F01', type: 'VIP 1', isAvailable: true, },
      {id: 2,  roomNumber: 'F01', type: 'VIP 1', isAvailable: false,},
      {id: 3,  roomNumber: 'F01', type: 'VIP 1', isAvailable: true,},
      {id: 4,  roomNumber: 'F01', type: 'VIP 1', isAvailable: true,},
      {id: 5,  roomNumber: 'F01', type: 'VIP 1', isAvailable: false,},
      {id: 6,  roomNumber: 'F01', type: 'VIP 1', isAvailable: true,},
      {id: 7,  roomNumber: 'F01', type: 'VIP 1', isAvailable: false,},
      {id: 8,  roomNumber: 'F01', type: 'VIP 1', isAvailable: true,},
      {id: 9,  roomNumber: 'F01', type: 'VIP 1', isAvailable: false,},
      {id: 10, roomNumber: 'F01', type: 'VIP 1', isAvailable: false,},

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
       
       
     

      />
    </div>
  );
}
