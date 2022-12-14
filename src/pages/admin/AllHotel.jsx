import {
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Tooltip,
  TextField,
  
} from "@mui/material";

import TitlebarImageList from "./ImageList";
import * as React from "react";
import axios from "axios";
import { textStyle } from "../../style";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Chip } from "@mui/material";

import { font } from "../../constants";
import { btnStyle } from "../../style";
import { CachedRounded } from "@mui/icons-material";

import { DataGrid } from "@mui/x-data-grid";
import { datagridSx } from "../../style";
import { SERVER_URL } from "../../constants";

import { counterContext } from "../../context/counter";

import { useFormatDate } from "../../services/formateDate";

import MapDialog from "./map.dialog";

import CloudDoneIcon from "@mui/icons-material/CloudDone";

import MapDialogEdit from "./map.dialog.editform";

import { EditHotelContext } from "../../context/edithotel.context";

export default function AllHotel() {
  const { EditHotel, setEditHotel } = React.useContext(EditHotelContext);
  const [popUpUpdateForm, setPopUpUpdateForm] = React.useState(false);
  const [popUpImg, setPopupImg] = React.useState(false);
  const handlePopUpImg = () => setPopupImg(!popUpImg);
  const [imgData, setImgData] = React.useState();

  const [popUpHotelUpdate, setPopupHotelUpdate] = React.useState(false);
  const [hotelUpdateData, setHotelUpdateData] = React.useState({});

  const [map, setMap] = React.useState();

  const [loading, setLoading] = React.useState(true);
  const [pageSize, setPageSize] = React.useState(10);
  const [resData, setResData] = React.useState([]);

  const { value, setValue } = React.useContext(counterContext);
  const [files, setFiles] = React.useState("");

  const [updating, setUpdating] = React.useState(false);
  const [updateSuccess, setUpdateSuccess] = React.useState(false);
  const [updateErr, setUpdateErr] = React.useState(false);

  const [popUpConfirm, setPopUpConfirm] = React.useState(false)

  const [bookingSearchPhone, setBookingSearchPhone] = React.useState([]);

  const [phoneSearch, setPhoneSearch] = React.useState(false);

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
        // console.log(res.data.users);
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
  const deleteHotel = async (hotelId) => {
    axios
      .delete(`${SERVER_URL}/api/delete/all-user-hotel?hotelId=${hotelId}`)
      .then(res => {
        console.log(res.data)
        setValue(value => value + 1)
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
      headerName: "????????????????????????",
      width: 100,
      sortable: false,
      renderCell: (parram) => {
        if (parram.row?.hotel?.isApproved) {
          return (
            <Stack direction="row" justifyContent="center">
              <Tooltip title="???????????????">
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
              <Tooltip title="?????????">
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
            {/*<Tooltip title="???????????????">
              <IconButton onClick={() => {}}>
                <EditIcon fontSize="small" />
              </IconButton>
        </Tooltip>*/}

            <Tooltip title="??????????????????">
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
            {/*<Tooltip title="?????????">
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
      headerName: "??????????????????",
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
      headerName: "??????????????????????????????????????????",
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
              ???.{param.row.hotel?.village}, ???.{param.row.hotel?.city},{" "}
            </span>
            <span>???.{param.row.hotel?.province} </span>
          </Stack>
        );
      },
    },
    {
      field: "image",
      headerName: "?????????",
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
      headerName: "???????????????????????????",
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
    //  headerName: "?????????",
    //  width: 50,
    //  sortable: false,
    //  hide: true,
    //  renderCell: (params) => {
    //    if (params.row.gender === "MALE") {
    //      return <div>????????????</div>;
    //    }
    //    return <span>?????????</span>;
    //  },
    //},

    //{
    //  field: "village",
    //  headerName: "??????????????????",
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
    //{ field: "village", headerName: "????????????", flex: 1, sortable: false },
    //{ field: "city", headerName: "???????????????", flex: 1, sortable: false },
    //{ field: "province", headerName: "????????????", flex: 1, sortable: false },
    {
      field: "map",
      headerName: "??????????????????",
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
            ??????????????????
          </div>
        );
      },
    },

    {
      field: "contact",
      headerName: "?????????????????????????????????????????????",
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
      headerName: "?????????????????????????????????????????????",
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
              label="??????????????????????????????"
              variant="outlined"
            />
          );
        } else {
          return (
            <Chip
              sx={{ fontFamily: "Noto Sans Lao", width: "100px" }}
              color="error"
              label="?????????????????????????????????"
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
        <span>??????????????????:</span>
        <TextField
          placeholder="??????????????????"
          variant="outlined"
          sx={{ ...textStyle, width: "200px", backgroundColor: "white" }}
          onChange={(e) => {

            if (e.target.value !== "") {
              setPhoneSearch(true);
            } else { setPhoneSearch(false) }

            let filtered = resData.filter(b => b?.hotel?.hotelName.includes(e.target.value));
            setBookingSearchPhone(
              filtered
            );
          }}
        />
      </Stack>
      <div style={{ height: 860, width: "100%" }}>
        <DataGrid
          sx={{ ...datagridSx, marginTop: "10px" }}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          rows={phoneSearch ? bookingSearchPhone : resData}
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
          {"??????????????????"}
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
            ??????????????????
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
            ???????????????????????????????????????????????????
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
              <label htmlFor="">???????????????????????????</label>
              <TextField
                sx={{ ...textStyle, width: "100%" }}
                defaultValue={hotelUpdateData?.hotelName}
                onChange={(e) => {
                  setEditHotel({ ...EditHotel, hotelName: e.target.value });
                }}
              />
            </Stack>
            <Stack>
              <label htmlFor="">???????????????</label>
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
              <label>????????????</label>
              <TextField
                defaultValue={hotelUpdateData?.province}
                sx={{ ...textStyle, width: "100%" }}
                onChange={(e) => {
                  setEditHotel({ ...EditHotel, province: e.target.value });
                }}
              />
            </Stack>
            <Stack spacing={0}>
              <label>???????????????</label>
              <TextField
                defaultValue={hotelUpdateData?.city}
                sx={{ ...textStyle, width: "100%" }}
                onChange={(e) => {
                  setEditHotel({ ...EditHotel, city: e.target.value });
                }}
              />
            </Stack>
            <Stack spacing={0}>
              <label>????????????</label>
              <TextField
                defaultValue={hotelUpdateData?.village}
                sx={{ ...textStyle, width: "100%" }}
                onChange={(e) => {
                  setEditHotel({ ...EditHotel, village: e.target.value });
                }}
              />
            </Stack>
            <Stack spacing={0}>
              <label>??????????????????????????????????????????????????? (??????????????????????????????????????????????????????????????? 1 ?????????)</label>
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
              <label htmlFor="">??????????????????</label>
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
                  setValue(value => value + 1)
                  //console.log(EditHotel);
                }}
              >
                ??????????????????
              </Button>
              {updating ? <span>?????????????????????????????????...</span> : updateSuccess ? <span>?????????????????????</span> : updateErr ? <span>Something went wrong</span> : null}
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
            ??????????????????
          </span>
        </DialogTitle>
        <DialogContent>
          <div
            style={{
              height: "80%",
              rowGap: "20px",
            }}
          >
            ?????????????????????????????????????????????????????????????????????????????????????
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {

            deleteHotel(EditHotel?._id)
            setValue(value => value + 1)
          }} sx={{
            ...btnStyle
          }}>
            ??????????????????
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
