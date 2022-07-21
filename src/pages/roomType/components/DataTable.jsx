import * as React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import {
  Alert,
  Button,
  Divider,
  IconButton,
  Skeleton,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";

import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
//components
import TitlebarImageList from "./ImageList";
import UpdateRoomType from "./UpdateRoomType";

import { font, router } from "../../../constants/index";
import { Construction } from "@mui/icons-material";

//context
import { roomTypeContext } from "../../../context/roomType.context";
import { counterContext } from "../../../context/counter";
import { dataContext } from "../../../context/data.context";

import "../style.css";

import { textStyle, btnStyle, datagridSx } from "../../../style";
import { useFormatDate } from "../../../services/formateDate";
import { fontFamily } from "@mui/system";
import SearchArea from "./SearchArea";
import { SERVER_URL } from "../../../constants/index";

export default function PageSizeCustomOptions() {
  const { roomType, setRoomType } = React.useContext(roomTypeContext);

  const { data, setData } = React.useContext(dataContext);
  const navigate = useNavigate();

  const { value, setValue } = React.useContext(counterContext);

  const [popUpUpdateForm, setPopUpUpdateForm] = React.useState(false);
  const handleUpdateForm = () => setPopUpUpdateForm(!popUpUpdateForm);
  const [updatedData, setUpdatedData] = React.useState({});

  const [popUpImg, setPopupImg] = React.useState(false);
  const handlePopUpImg = () => setPopupImg(!popUpImg);

  const hotelID = localStorage.getItem("hotel");
  const [count, setCount] = React.useState(0);

  const [imgData, setImgData] = React.useState();

  //const [roomData, setRoomData] = React.useState([]);

  const [resData, setResData] = React.useState([]);
  //const [dataRows, setDataRows] = React.useState([]);
  const [error, setError] = React.useState(false);

  const [isLoading, setloading] = React.useState(true);
  //const [imgSrc, setImgSrc] = React.useState([]);
  const [confirmDeleted, setConfirmDeleted] = React.useState(false);
  const [deletedId, setDeletedId] = React.useState("");
  const [deleteSuccess, setDeleteSuccess] = React.useState(false);
  const [deleteErr, setDeleteErr] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  const [deleteId, setDeleteId] = React.useState();
  const [popUpConfirm, setPopUpConfirm] = React.useState(false);

  const fetchData = async () => {
    setloading(true);
    setError(false)
    

    await axios
      .get(`${SERVER_URL}/api/room-types/skip/0/limit/30?hotelId=${hotelID}`, {
        timeout: 5000,
      })
      .then((res) => {
        setResData(res.data.roomTypes);
        setRoomType({
          ...roomType,
          roomTypeData: res.data.roomTypes,
          isLoading: false,
          hasErr: false,
          isSuccess: true,
        });
        console.log(roomType.roomTypeData)

        setloading(false);
        setError(false);
        
      })
      .catch((err) => {
        console.error(err);
        //setError(true);
        setloading(false)
      });
    // console.log(resData);
  };
  const deleteRoomType = async (deletedId) => {
    setDeleteErr(false);
    setDeleteLoading(true);
    setDeleteSuccess(false);
    var data = JSON.stringify({
      id: "" + deletedId,
    });

    var config = {
      method: "delete",
      url: `${SERVER_URL}/api/delete/room-type`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setDeleteSuccess(true);
        //alert(`Deleted successfully`);
      })
      .catch(function (error) {
        console.log(error);
        setDeleteErr(true);
        if(error.response){
          alert(error.response.data.message);

        }

        
      })
      .finally(() => {
        setDeleteLoading(false);
      });
    setCount((count) => count + 1);
  };

  React.useEffect(() => {
    //setloading(true);

    fetchData();

    console.log(`resdata: ${resData}`);
  }, [value]);
  /// pop up form to view images

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
                setDeleteId(parram.row.roomType._id)
                setPopUpConfirm(true)
                
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
      headerName: "ລາຍລະອຽດ",
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
    <div>
      <SearchArea />
      <br />
      <Divider/>
      {error ? <h1>there
         is an error in loading</h1>: null}
      {isLoading ? (
        //<Skeleton variant="rectangular" width="100%" height={660} />
        <h1>Loading...</h1>
      ) : (
        <div style={{ height: 660, width: "100%" }}>
          {/**table area */}

          <DataGrid
            sx={{ ...datagridSx, marginTop: "10px" }}
            getRowId={(row) => row.roomType._id}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            rows={roomType.roomTypeData}
            columns={columns}
            disableSelectionOnClick
            loading={isLoading}
            
          />
          {/**show image album */}
          <Dialog
            open={popUpImg}
            onClose={handlePopUpImg}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle
              sx={{ fontFamily: "Noto sans lao", fontSize: "18px" }}
              id="add-new-type"
            >
              {"ຮູບພາບ"}
            </DialogTitle>
            <DialogContent>
              <TitlebarImageList imgData={imgData} />
            </DialogContent>
          </Dialog>
          {/**show update form */}
          <Dialog
            open={popUpUpdateForm}
            onClose={handleUpdateForm}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <UpdateRoomType updatedData={updatedData} />
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
              <Button sx={{ ...btnStyle }} onClick={ ()=> {
                setPopUpConfirm(false)
                deleteRoomType(deleteId);

                setValue(() => value + 1);
                }}>
                ຕົກລົງ
              </Button>
              <Button
                sx={{ ...btnStyle }}
                onClick={() => setPopUpConfirm(false)}
              >
                ຍົກເລີກ
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
}
