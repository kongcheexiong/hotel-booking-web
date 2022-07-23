import { Stack, TextField, Button } from "@mui/material";
import React from "react";
import { textStyle,btnStyle,datagridSx } from "../../../style";
import { font } from "../../../constants";

//icon 
import SearchIcon from '@mui/icons-material/Search';

import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";


export default function Table() {
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
                
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>

            <IconButton
              onClick={async () => {
                await console.log(parram.row.roomType);
                await setUpdatedData(parram.row.roomType);

                await console.log(updatedData);
                handleUpdateForm();

                //navigate(`${router.ROOMTYPEMANAGEMENT}/add`)
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </div>
        );
      },
    },
    { field: "billId", headerName: "ລະຫັດ", width: 80,
  
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
    { field: "lastName", headerName: "ນາມສະກຸນ", flex: 1,

  
  },
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
      renderCell: (params)=>{
        return <span>{`${params.row.checkInDate} - ${params.row.checkOutDate}`}</span>
      }
    },
    {
      field: "checkedInBy",
      headerName: "ແຈ້ງເຂົ້າໂດຍ",
      flex: 1,
    },

    {
      field: "isCheckOut",
      headerName: "ສະຖານະ",
      type: "boolean",
      //renderCell: (params) => {
      //  const date = useFormatDate(params.row.roomType.updatedAt);
      //  return <span>{date}</span>;
      //},
    },
    {
      field: "isPaid",
      headerName: "ຈ່າບແລ້ວ",
      type: "boolean",
      flex: 1.5,
     
      
    },
  ];

  return (
    <Stack direction="column">
      {/**search textfield */}
      <Stack direction="row" justifyContent="flex-end" spacing={1} alignItems='center'>
        
        <span>ຄັ້ນຫາ :</span>
        <TextField placeholder="ລະຫັດບິນ" variant="outlined"  sx={{ ...textStyle, width: "200px", backgroundColor: 'white' }} />
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
            rows={()=>{}}
            columns={columns}
            disableSelectionOnClick
            getRowId={(row) => row._id}
          />

      </div>
      

    </Stack>
  );
}
