import { Stack, TextField, Button,IconButton,Dialog,DialogContent,DialogActions, DialogTitle } from "@mui/material";
import React from "react";
import { textStyle, btnStyle, datagridSx } from "../../../style";
import { font, SERVER_URL,color } from "../../../constants";
import CheckOutComponent from "./checkOut.component";

//icon
import SearchIcon from "@mui/icons-material/Search";

import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { CheckInContextContext } from "../../../context/checkin.context";
import { counterContext } from "../../../context/counter";

import LogoutIcon from '@mui/icons-material/Logout';

import {format} from 'date-fns'
import CancelIcon from "@mui/icons-material/Cancel";

export default function Table() {
  const [pageSize, setPageSize] = React.useState(10);
  const { CheckInContext, setCheckInContext } = React.useContext(
    CheckInContextContext
  );
  const [loading, setLoading] = React.useState(true)

  const { value, setValue } = React.useContext(counterContext);
  const [checkOutData, setCheckOutData] = React.useState()

  const [isOpenCheckout,setIsOpenCheckout] =React.useState(false)
  const fetchCheckIn = async () => {
    setCheckInContext([])
    setLoading(true)
    axios
      .get(`${SERVER_URL}/api/check-in-data/skip/0/limit/30?hotel=${localStorage.getItem('hotel')}`)
      .then((res) => {
        console.log(res.data);
        setCheckInContext(res.data.checkIns);
        setLoading(false)
      })
      .catch((err) => console.error(err));
  };

 

  React.useEffect(() => {
    fetchCheckIn();
    setIsOpenCheckout(false)
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
            <IconButton onClick={() => {
              setCheckOutData(parram.row)
              console.log(parram.row)
              setIsOpenCheckout(true)
            }}>
              <LogoutIcon fontSize="small" />
            </IconButton>

          </div>
        );
      },
    },
    { field: "billId", headerName: "ລະຫັດ", width: 80 },
    { field: "roomName", headerName: "ຫ້ອງ", width: 80, renderCell: param=>{
      return <span> {param.row.room?.roomName}</span>

    } },
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
        if(params.row?.checkInDate && params.row?.checkOutDate){
          const start = format(new Date(params.row?.checkInDate),'dd/MM/yyy')
          const end = format(new Date(params.row?.checkOutDate),'dd/MM/yyy')
  
          return (
            <Stack>
              <span>{`${start}`}</span>
            <span>{`${end} `}</span>
            </Stack>

          );
          return <></>

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
          placeholder="ລະຫັດບິນ"
          variant="outlined"
          sx={{ ...textStyle, width: "200px", backgroundColor: "white" }}
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
          rows={CheckInContext}
          columns={columns}
          disableSelectionOnClick
          getRowId={(row) => row._id}
          loading={loading}
        />
      </div>
      {/**checkout dialog */}
      <Dialog
          open={isOpenCheckout}
          onClose={() => {
            setIsOpenCheckout(false)
            
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
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
              <span>{"ຢືນຢັນການແຈ້ງອອກ"}</span>
             
            <IconButton onClick={()=> setIsOpenCheckout(false)}>
              <CancelIcon fontSize=""/>
            </IconButton>
              

            </Stack>
            
          </DialogTitle>
          <DialogContent>
         
            <CheckOutComponent data={checkOutData} />
           
            
          </DialogContent>
          <DialogActions>
           
       
          </DialogActions>
        </Dialog>
    </Stack>
  );
}
