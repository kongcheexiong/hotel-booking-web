import * as React from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import {
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { counterContext } from "../../../context/counter";

import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { Chip } from "@mui/material";

import { font } from "../../../constants/index";
import { btnStyle, datagridSx } from "../../../style";

import { useFormatDate } from "../../../services/formateDate";
// component
import TitlebarImageList from "./ImageList";
import EditUser from "./EditUser";

import { SERVER_URL } from "../../../constants/index";

export default function Table() {
  const { value, setValue } = React.useContext(counterContext);
  const hotelId = localStorage.getItem("hotel");
  const [pageSize, setPageSize] = React.useState(10);

  const [total, setTotal] = React.useState();
  const [resData, setResData] = React.useState([]);
  const [loading, setloading] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [popUpImg, setPopupImg] = React.useState(false);
  const handlePopUpImg = () => setPopupImg(!popUpImg);
  const [imgData, setImgData] = React.useState();

  const [deleteId, setDeleteId] = React.useState();

  const [updateData, setUpdatedData] = React.useState();
  const [popUpUpdateForm, setPopUpUpdateForm] = React.useState(false);
  const [popUpConfirm, setPopUpConfirm] = React.useState(false);

  const fetchData = async () => {
    setResData([])
    setloading(true);
    setSuccess(false);
    setErr(false);
    await axios
      .get(`${SERVER_URL}/api/users/skip/0/limit/30?hotelId=${hotelId}`, {
        timeout: 5000,
      })
      .then((res) => {
        console.log(res.data.users);
        setTotal(res.data.total);
        setResData(res.data.users);
      
        setSuccess(true);
        setloading(false);
      })
      .catch((err) => {
        setErr(true);
        console.error(err);
        setSuccess(false);
        setloading(false);
      });
  };

  const deleteUser = async (userID) => {
    await axios
      .delete(`${SERVER_URL}/api/delete/user`, {
        data: {
          id: userID,
        },
        timeout: 5000,
      })
      .then((res) => {
        console.log(res.data);
        //alert("delete successfully");
        fetchData();
      })
      .catch((err) => console.error(err));
  };

  const columns = [
    {
      field: "action",
      headerName: "ຕົວເລືອກ",
      width: 90,
      sortable: false,
      renderCell: (parram) => {
        return (
          <Stack direction="row" justifyContent="center">
            <IconButton
              onClick={() => {
                console.log(parram.row);
                setDeleteId(parram.row._id);
                setPopUpConfirm(true);
                //deleteUser(parram.row._id);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => {
                let data = parram.row;
                setUpdatedData(data);
                console.log(updateData);
                setPopUpUpdateForm(true);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Stack>
        );
      },
    },
    { field: "_id", headerName: "ລະຫັດ", width: 70 },
    { field: "userName", headerName: "ຜູ້ໃຊ້", flex: 1, sortable: false },
    {
      field: "image",
      headerName: "ຮູບ",
      width: 70,
      sortable: false,
      renderCell: (parram) => {
        return (
          <div
            className="previewImg"
            onClick={() => {
              console.log(parram.row.image);
              handlePopUpImg();
              setImgData(parram.row.image);
            }}
          >
            {parram.row.image}
          </div>
        );
      },
    },
    {
      field: "gender",
      headerName: "ເພດ",
      width: 50,
      sortable: false,
      renderCell: (params) => {
        if (params.row.gender === "MALE") {
          return <div>ທ້າວ</div>;
        }
        return <span>ນາງ</span>;
      },
    },
    { field: "firstName", headerName: "ຊື່", flex: 1, sortable: false },
    { field: "lastName", headerName: "ນາມສະກຸນ", flex: 1, sortable: false },
    {
      field: "birthday",
      headerName: "ວັນເດືອນປີເກີດ",
      flex: 1,
      sortable: false,
      align: "center",
      renderCell: (params) => {
        if (!params.row.birthday) {
          return <div>null</div>;
        }
        const date = useFormatDate(params.row.birthday);
        return <span>{date}</span>;
      },
    },
    { field: "village", headerName: "ບ້ານ", flex: 1, sortable: false },
    { field: "city", headerName: "ເມືອງ", flex: 1, sortable: false },
    { field: "province", headerName: "ແຂວງ", flex: 1, sortable: false },
    { field: "phone", headerName: "ເບີໂທວະສັບ", flex: 1, sortable: false },
    { field: "role", headerName: "Role", flex: 0.6 },
  ];

  const rows = [
    {
      _id: 1,
      userName: "F01",
      image: "img.png",
      firstName: "ກົງຈີ",
      lastName: "ຊົ່ງຕົງສື",
      DateOfBirth: "03/10/2000",
      village: "ໂພນເຄັງ",
      city: "ໄຊເສດຖາ",
      province: "ນະຄອນຫຼວງວຽງຈັນ",
      phone: "23826684",
      role: "Admin",
    },
  ];
  React.useEffect(() => {
    fetchData();
    console.log(resData);
  }, [value]);

  return (
    <div style={{
      marginTop: '20px'
    }}>
      
      {err && <h1>there is an error</h1>}
      <div style={{ height: 660, width: "100%" }}>
          <DataGrid
            sx={{ ...datagridSx, marginTop: "10px" }}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            rows={resData}
            columns={columns}
            disableSelectionOnClick
            getRowId={(row) => row._id}
            loading={loading}
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
            fullWidth
            maxWidth="sm"
            open={popUpUpdateForm}
            onClose={() => setPopUpUpdateForm(false)}
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
                ແກ້ໄຂຂໍ້ມູນພະນັກງານ
              </span>
            </DialogTitle>
            <DialogContent>
              <EditUser data={updateData} />
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
                deleteUser(deleteId)
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
      
    </div>
  );
}
