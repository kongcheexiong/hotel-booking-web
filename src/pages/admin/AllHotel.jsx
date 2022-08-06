import {
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Tooltip,
  TextField,
  Autocomplete,
  Box,
  MenuItem,
  Select,
} from "@mui/material";

import TitlebarImageList from "./ImageList";
import * as React from "react";
import axios from "axios";
import { textStyle } from "../../style";

import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { Chip } from "@mui/material";

import { font } from "../../constants";
import { btnStyle } from "../../style";
import { CachedRounded } from "@mui/icons-material";

import { DataGrid } from "@mui/x-data-grid";
import { datagridSx } from "../../style";
import { SERVER_URL } from "../../constants";

import ShowHotelDetail from "./showHotelDetail";

import { counterContext } from "../../context/counter";

import { useFormatDate } from "../../services/formateDate";
import MapIcon from "@mui/icons-material/Map";

import MapDialog from "./map.dialog";

import CloudDoneIcon from "@mui/icons-material/CloudDone";

import MapDialogEdit from "./map.dialog.editform";

import { EditHotelContext } from "../../context/edithotel.context";

import laoInfo from "../../../lao.json";

export default function AllHotel() {
  const { EditHotel, setEditHotel } = React.useContext(EditHotelContext);
  const [popUpUpdateForm, setPopUpUpdateForm] = React.useState(false);
  const [popUpImg, setPopupImg] = React.useState(false);
  const handlePopUpImg = () => setPopupImg(!popUpImg);
  const [imgData, setImgData] = React.useState();

  const [popUpHotelUpdate, setPopupHotelUpdate] = React.useState(false);
  const [hotelUpdateData, setHotelUpdateData] = React.useState({});

  const [province, setProvince] = React.useState([]);
  const [district, setDistrict] = React.useState([]);
  const [village, setVillage] = React.useState([]);

  const [map, setMap] = React.useState();

  const [loading, setLoading] = React.useState(true);
  const [pageSize, setPageSize] = React.useState(10);
  const [resData, setResData] = React.useState([]);

  const { value, setValue } = React.useContext(counterContext);

  const [showVillage, setShowVillage] = React.useState("");
  const [showDistrict, setShowDistrict] = React.useState("");
  const [showProvince, setShowProvince] = React.useState("");
  const [files, setFiles] = React.useState("");

  const [updating, setUpdating] = React.useState(false);
  const [updateSuccess, setUpdateSuccess] = React.useState(false);
  const [updateErr, setUpdateErr] = React.useState(false);

  const [popUpConfirm, setPopUpConfirm] = React.useState(false)



  const handleUploadImg = async () => {
    setLoading(true);
    let data = new FormData();

    for (const i of Object.keys(files)) {
      data.append("file", files[i]);
    }

    var config = {
      method: "post",
      url: `${SERVER_URL}/api/upload/images`,
      data: data,
      timeout: 40000,
    };

    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
        setUpdateErr(true);
      });
  };

  const fetchData = async () => {
    setResData([]);
    // setloading(true);
    await axios
      .get(`${SERVER_URL}/api/hotels_owner/skip/:skip/limit/:limit`, {
        timeout: 40000,
      })
      .then((res) => {
        console.log(res.data.users);
        //setTotal(res.data.total);
        setResData(res.data.users);
        //
        // setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        //  setErr(true);
        console.error(err);
        // setSuccess(false);
        setLoading(false);
      });
  };

  const handleUpdateStatus = async (id, to, name) => {
    await axios
      .put(`${SERVER_URL}/api/hotel/approve`, {
        hotelId: id,
      })
      .then(async (res) => {
        console.log(res.data);
        setValue((value) => value + 1);
      })
      .catch((err) => console.log(err));
  };
  const handleSendEmail = async (to, name, userId) => {
    await axios
      .post(`${SERVER_URL}/api/send/email`, {
        email: to,
        userName: name,
        id: userId,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };
  const deleteHotel = async (hotelId)=>{
    axios
      .delete(`${SERVER_URL}/api/delete/all-user-hotel?hotelId=${hotelId}`)
      .then(res => {
        console.log(res.data)
        setValue(value => value+1)
      })
      .catch(err => console.error(err));

  }

  const updateDataHotel = async () => {
    axios
      .put(`${SERVER_URL}/api/update/hotel`, {
        id: hotelUpdateData?._id,
        data: EditHotel
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setUpdateErr(true);
      });
  };

  const columns = [
    {
      field: "action",
      headerName: "ຕົວເລືອກ",
      width: 100,
      sortable: false,
      renderCell: (parram) => {
        if (parram.row?.hotel?.isApproved) {
          return (
            <Stack direction="row" justifyContent="center">
              <Tooltip title="ແກ້ໄຂ">
                <IconButton
                  onClick={() => {
                    setPopupHotelUpdate(true);
                    setMap(parram.row);
                    setHotelUpdateData(parram.row.hotel);
                    setEditHotel(parram.row.hotel);
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="ລົບ">
                <IconButton onClick={() => {
                  setPopUpConfirm(true)
                  setEditHotel(parram.row.hotel);
                }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        }
        return (
          <Stack direction="row" justifyContent="center">
            {/*<Tooltip title="ແກ້ໄຂ">
              <IconButton onClick={() => {}}>
                <EditIcon fontSize="small" />
              </IconButton>
        </Tooltip>*/}

            <Tooltip title="ຢືນຢັນ">
              <IconButton
                onClick={async () => {
                  console.log(parram.row.hotel._id);
                  await handleSendEmail(
                    parram.row.hotel.email,
                    parram.row.userName,
                    parram.row._id
                  );
                  await handleUpdateStatus(parram.row.hotel._id);
                }}
              >
                <CloudDoneIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            {/*<Tooltip title="ລົບ">
              <IconButton onClick={() => {}}>
                <DeleteIcon fontSize="small" />
              </IconButton>
              </Tooltip>*/}
          </Stack>
        );
      },
    },
    {
      field: "userName",
      headerName: "ຜູ້ໃຊ້",
      flex: 0.6,
      renderCell: (param) => {
        const date = useFormatDate(param.row.birthday);
        return (
          <Stack>
            <span
              style={{
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {param.row.userName}
            </span>
            <span>
              {param.row.firstName} {param.row.lastName}{" "}
            </span>
            <span>{date}</span>
          </Stack>
        );
      },
    },
    {
      field: "hotelDetail",
      headerName: "ລາຍລະອຽດໂຮງແຮມ",
      flex: 0.6,
      renderCell: (param) => {
        return (
          <Stack>
            <span
              style={{
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {param.row.hotel?.hotelName}
            </span>
            <span>
              ບ.{param.row.hotel?.village}, ມ.{param.row.hotel?.city},{" "}
            </span>
            <span>ຂ.{param.row.hotel?.province} </span>
          </Stack>
        );
      },
    },
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
      field: "hotelImage",
      headerName: "ຮູບໂຮງແຮມ",
      width: 70,
      sortable: false,
      renderCell: (parram) => {
        return (
          <div
            className="previewImg"
            onClick={() => {
              console.log(parram.row.image);
              handlePopUpImg();
              setImgData(parram.row.hotel.images);
            }}
          >
            {parram.row.image}
          </div>
        );
      },
    },
    //{
    //  field: "gender",
    //  headerName: "ເພດ",
    //  width: 50,
    //  sortable: false,
    //  hide: true,
    //  renderCell: (params) => {
    //    if (params.row.gender === "MALE") {
    //      return <div>ທ້າວ</div>;
    //    }
    //    return <span>ນາງ</span>;
    //  },
    //},

    //{
    //  field: "village",
    //  headerName: "ທີ່ຢູ່",
    //  flex: 1,
    //  sortable: false,
    //  renderCell: (params) => {
    //    return (
    //      <span>{params.row.village},{params.row.city},{params.row.province}</span>
    //
    //
    //    )
    //  },
    //},
    //{ field: "village", headerName: "ບ້ານ", flex: 1, sortable: false },
    //{ field: "city", headerName: "ເມືອງ", flex: 1, sortable: false },
    //{ field: "province", headerName: "ແຂວງ", flex: 1, sortable: false },
    {
      field: "map",
      headerName: "ແຜນທີ່",
      width: 70,
      sortable: false,
      renderCell: (parram) => {
        return (
          <div
            className="previewImg"
            onClick={() => {
              let data = parram.row;
              setMap(data);
              console.log(map);
              setPopUpUpdateForm(true);
            }}
          >
            ແຜນທີ່
          </div>
        );
      },
    },

    {
      field: "contact",
      headerName: "ຂໍ້ມູນການຕິດຕໍ່",
      flex: 0.7,
      sortable: false,
      renderCell: (param) => {
        return (
          <Stack>
            <span>{param.row.hotel?.phone}</span>
            <span>{param.row.hotel?.email}</span>
          </Stack>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "ວັນທີສ້າງລາຍການ",
      flex: 0.5,
      sortable: false,
      renderCell: (param) => {
        const date = useFormatDate(param.row.createdAt);
        return (
          <Stack>
            <span>{date}</span>
          </Stack>
        );
      },
    },

    {
      field: "status",
      headerName: "status",
      width: 100,

      renderCell: (param) => {
        if (param.row.hotel?.isApproved) {
          return (
            <Chip
              sx={{ fontFamily: "Noto Sans Lao", width: "100px" }}
              color="success"
              label="ຢືນຢັນແລ້ວ"
              variant="outlined"
            />
          );
        } else {
          return (
            <Chip
              sx={{ fontFamily: "Noto Sans Lao", width: "100px" }}
              color="error"
              label="ລໍຖ້າກວດສອບ"
              variant="outlined"
            />
          );
        }
      },
    },
  ];

  React.useEffect(() => {
    fetchData();
  }, [value]);
  return (
    <Stack direction="column" spacing={2}>
      <Button
        disableElevation
        variant="outlined"
        color="secondary"
        sx={{
          ...btnStyle,
          width: "150px",
          height: "35px",
          "&.MuiButton-root": {
            fontFamily: `${font.EN_FONT}`,
          },
        }}
        startIcon={<CachedRounded />}
        onClick={() => {
          setResData([]);
          setLoading(true);
          setValue((value) => value + 1);
        }}
      >
        Reload
      </Button>
      <Divider />
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <span>ຄັ້ນຫາ:</span>
        <TextField
          placeholder="ໂຮງແຮມ"
          variant="outlined"
          sx={{ ...textStyle, width: "200px", backgroundColor: "white" }}
        />
      </Stack>
      <div style={{ height: 860, width: "100%" }}>
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
          rowHeight={70}
          //autoHeight
          // getRowHeight={() => 'auto'}
        />
      </div>
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

      {/**show map */}
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
            ແຜນທີ່
          </span>
        </DialogTitle>
        <DialogContent>
          <MapDialog data={map} />
        </DialogContent>
      </Dialog>
      {/**show updated hotel form */}
      <Dialog
        fullWidth
        maxWidth="sm"
        open={popUpHotelUpdate}
        onClose={() => {
          setPopupHotelUpdate(false);
        }}
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
            ແກ້ໄຂຂໍ້ມູນໂຮງແຮມ
          </span>
        </DialogTitle>
        <DialogContent>
          <div
            style={{
              height: "80%",
              rowGap: "20px",
            }}
          >
            <Stack>
              <label htmlFor="">ຊື່ໂຮງແຮມ</label>
              <TextField
                sx={{ ...textStyle, width: "100%" }}
                defaultValue={hotelUpdateData?.hotelName}
                onChange={(e) => {
                  setEditHotel({ ...EditHotel, hotelName: e.target.value });
                }}
              />
            </Stack>
            <Stack>
              <label htmlFor="">ເບີໂທ</label>
              <TextField
                defaultValue={hotelUpdateData?.phone}
                sx={{ ...textStyle, width: "100%" }}
                onChange={(e) => {
                  setEditHotel({ ...EditHotel, phone: e.target.value });
                }}
              />
            </Stack>
            <Stack>
              <label htmlFor="">Email</label>
              <TextField
                defaultValue={hotelUpdateData?.email}
                sx={{ ...textStyle, width: "100%" }}
                onChange={(e) => {
                  setEditHotel({ ...EditHotel, email: e.target.value });
                }}
              />
            </Stack>
            <Stack spacing={0}>
              <label>ແຂວງ</label>
              <TextField
                defaultValue={hotelUpdateData?.province}
                sx={{ ...textStyle, width: "100%" }}
                onChange={(e) => {
                  setEditHotel({ ...EditHotel, province: e.target.value });
                }}
              />
            </Stack>
            <Stack spacing={0}>
              <label>ເມືອງ</label>
              <TextField
                defaultValue={hotelUpdateData?.city}
                sx={{ ...textStyle, width: "100%" }}
                onChange={(e) => {
                  setEditHotel({ ...EditHotel, city: e.target.value });
                }}
              />
            </Stack>
            <Stack spacing={0}>
              <label>ບ້ານ</label>
              <TextField
                defaultValue={hotelUpdateData?.village}
                sx={{ ...textStyle, width: "100%" }}
                onChange={(e) => {
                  setEditHotel({ ...EditHotel, village: e.target.value });
                }}
              />
            </Stack>
            <Stack spacing={0}>
              <label>ເພີ່ມຮູບພາບໂຮງແຮມ (ສາມາດເລືອກໄດ້ຫຼາຍກວ່າ 1 ຮູບ)</label>
              <input
                accept="image/png, image/gif, image/jpeg"
                style={{ width: "200px" }}
                name="filefield"
                multiple="multiple"
                type="file"
                onChange={(event) => {
                  event.preventDefault();
                  const file = event.target.files;
                  setFiles(file);
                  //const frmdata = new FormData();
                  const fileImage = [];
                  for (var x = 0; x < file.length; x++) {
                    //  frmdata.append("file", file[x]);
                    fileImage.push(file[x].name);
                  }
                  setEditHotel({
                    ...EditHotel,
                    images: fileImage,
                  });
                }}
              />
            </Stack>
            <Stack>
              <label htmlFor="">ແຜນທີ່</label>
              <MapDialogEdit data={map} />
            </Stack>

            <br />
            <Stack>
            <Button
              variant="contained"
              sx={{ ...btnStyle, width: "100px" }}
              onClick={async () => {
                setUpdating(true);
                await updateDataHotel();
                await handleUploadImg();
                setUpdating(false);
                setUpdateSuccess(true);
                setValue(value => value+1)
                //console.log(EditHotel);
              }}
            >
              ຕົກລົງ
            </Button>
            {updating? <span>ແກ້ໄຂຂໍ້ມູນ...</span>: updateSuccess? <span>ສໍາເລັດ</span> : updateErr? <span>Something went wrong</span> : null}
            </Stack>
          
          </div>
        </DialogContent>
      </Dialog>
          {/**show confirm delete hotel */}
          <Dialog
        fullWidth
        maxWidth="xs"
        open={popUpConfirm}
        onClose={() => {
          setPopUpConfirm(false);
        }}
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
          <div
            style={{
              height: "80%",
              rowGap: "20px",
            }}
          >
            ທ່ານຕ້ອງແກ້ລົບລາຍການນີ້ແທ້ບໍ?
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{
            
            deleteHotel(EditHotel?._id)
            setValue(value => value+1)
          }} sx={{
            ...btnStyle
          }}>
            ຕົກລົງ
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
