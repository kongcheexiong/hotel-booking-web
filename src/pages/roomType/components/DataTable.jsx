import * as React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import axios from "axios";
import { roomTypeContext } from "../RoomType.context";

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

import "../style.css";

export default function PageSizeCustomOptions() {
  const navigate = useNavigate()
  //const {setRoomType} = React.useContext(roomTypeContext)
  //const roomType = React.useContext(roomTypeContext)
  const [popUpUpdateForm, setPopUpUpdateForm] = React.useState(false)
  const handleUpdateForm = ()=> setPopUpUpdateForm(!popUpUpdateForm)
  const [updatedData, setUpdatedData] = React.useState({})

  const [popUpImg, setPopupImg] = React.useState(false);
  const handlePopUpImg = () => setPopupImg(!popUpImg);

  const hotelID = localStorage.getItem("hotel");
  const [count, setCount] = React.useState(0);

  

  //const [roomData, setRoomData] = React.useState([]);

  const [resData, setResData] = React.useState([]);
  //const [dataRows, setDataRows] = React.useState([]);
  const [error, setError] = React.useState(false);

  const [isLoading, setloading] = React.useState(true);
  const [imgSrc, setImgSrc] = React.useState([]);

  const fetchData = async () => {
    await axios
      .get(
        `http://localhost:8080/api/room-types/skip/0/limit/30?hotelId=${hotelID}`,
        { timeout: 5000 }
      )
      .then((res) => {
        setResData(res.data.roomTypes);
        setloading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
    console.log(resData);
  };
  const deleteRoomType = async (deletedId) => {
    var data = JSON.stringify({
      id: "" + deletedId,
    });

    var config = {
      method: "delete",
      url: "http://localhost:8080/api/delete/room-type",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    setCount((count) => count + 1);
  };

  React.useEffect(() => {
    //setResData([])
    setloading(true);

    //setResData([]);
    fetchData();
  }, [count]);
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
                console.log(parram.row._id);
                deleteRoomType(parram.row._id);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>

            <IconButton
              onClick={ async() => {

                await console.log(parram.row)
                await setUpdatedData(parram.row)
                
                await console.log(updatedData);
                handleUpdateForm();
               //await setRoomType({isEdit: true ,data: parram.row})
               //console.log(roomType.roomType)
                //navigate(`${router.ROOMTYPEMANAGEMENT}/add`)
                

              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </div>
        );
      },
    },
    { field: "_id", headerName: "ລະຫັດ", width: 80 },
    {
      field: "typeName",
      headerName: "ຊື່ປະເພດຫ້ອງ",
      flex: 1,
      sortable: false,
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
              handlePopUpImg()
              setImgSrc(parram.row.images);
            }}
          >
            {parram.row.images}
          </div>
        );
      },
    },
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
    <div>
      {error && <h1>there is an error in loading</h1>}
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div style={{ height: 650, width: "100%" }}>
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
              <TitlebarImageList imgName={imgSrc} />
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
        </div>
      )}
    </div>
  );
}
