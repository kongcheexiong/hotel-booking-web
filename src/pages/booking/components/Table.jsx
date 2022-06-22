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
                console.log(parram.row.roomType._id);
                //setConfirmDeleted(true);
                //setDeletedId(parram.row._id)
                //alert('dfasd')
                deleteRoomType(parram.row.roomType._id);

                setValue(() => value + 1);
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
    { field: "_id", headerName: "ລະຫັດ", width: 80,
    renderCell: (parram) => {
      return (
        <div>
          {parram.row.roomType._id}
        </div>
      );
    },
  
  },
    {
      field: "typeName",
      headerName: "ຊື່ປະເພດຫ້ອງ",
      flex: 1,
      sortable: false,
      renderCell: (parram) => {
        return (
          <div>
            {parram.row.roomType.typeName}
          </div>
        );
      },
    },
    {
      field: "images",
      headerName: "ຮູບ",
      flex: 1,
      sortable: false,
      renderCell: (parram) => {
        return (
          <div
            className="previewImg"
            onClick={() => {
              handlePopUpImg();
              //setImgSrc(parram.row.images);
              setImgData(parram.row.roomType);
              // console.log(parram.row)
            }}
          >
            {parram.row.roomType.images}
          </div>
        );
      },
    },
    { field: "price", headerName: "ລາຄາ", flex: 1,
    renderCell: (parram) => {
      return (
        <div>
          {parram.row.roomType.price}
        </div>
      );
    },
  
  },
    {
      field: "numberOfBed",
      headerName: "ຈໍານວນຕຽງ",
      type: "number",
      flex: 1,
      renderCell: (parram) => {
        return (
          <div>
            {parram.row.roomType.numberOfBed}
          </div>
        );
      },
    },
    {
      field: "suggestedGuestAllowed",
      headerName: "ຈໍານວນລູກຄ້າແນະນໍາ",
      type: "number",
      flex: 1,
      renderCell: (parram) => {
        return (
          <div>
            {parram.row.roomType.suggestedGuestAllowed}
          </div>
        );
      },
    },
    {
      field: "totalRoom",
      headerName: "ຫ້ອງທັງໝົດ",
      type: "number",
      flex: 1,
      renderCell: (parram) => {
        return (
          <div>
            {parram.row.totalRoom}
          </div>
        );
      },
    },
    {
      field: "updatedAt",
      headerName: "ວັນທີ່ສ້າງລາຍການ",
      type: "date",
      flex: 1.5,
      renderCell: (params) => {
        const date = useFormatDate(params.row.roomType.updatedAt);
        return <span>{date}</span>;
      },
    },
    {
      field: "note",
      headerName: "ໝາຍເຫດ",
      type: "number",
      flex: 1.5,
      sortable: false,
      renderCell: (parram) => {
        return (
          <div>
            {parram.row.roomType.note}
          </div>
        );
      },
    },
  ];

  return (
    <Stack direction="column">
      {/**search textfield */}
      <Stack direction="row" justifyContent="flex-end" spacing={1} alignItems='center'>
        
        <span>ຄັ້ນຫາ :</span>
        <TextField placeholder="ເບີໂທລະສັບ" variant="outlined"  sx={{ ...textStyle, width: "200px", backgroundColor: 'white' }} />
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
