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
} from "@mui/material";

import TitlebarImageList from "../employee/components/ImageList";
import * as React from "react";
import axios from "axios";

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

export default function AllHotel() {
  const [popUpUpdateForm, setPopUpUpdateForm] = React.useState(false);
  const [popUpImg, setPopupImg] = React.useState(false);
  const handlePopUpImg = () => setPopupImg(!popUpImg);
  const [imgData, setImgData] = React.useState();

  const [updateData, setUpdatedData] = React.useState();

  const [loading, setLoading] = React.useState(true);
  const [pageSize, setPageSize] = React.useState(10);
  const [resData, setResData] = React.useState([]);

  const { value, setValue } = React.useContext(counterContext);

  const fetchData = async () => {
    setResData([]);
    // setloading(true);
    await axios
      .get(`${SERVER_URL}/api/hotels_owner/skip/:skip/limit/:limit`, {
        timeout: 5000,
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
        id: userId
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  const columns = [
    {
      field: "action",
      headerName: "ຕົວເລືອກ",
      width: 100,
      sortable: false,
      renderCell: (parram) => {
        return (
          <Stack direction="row" justifyContent="center">
            <IconButton
              onClick={() => {
                let data = parram.row;
                setUpdatedData(data);
                console.log(updateData);
                setPopUpUpdateForm(true);
              }}
            >
              <MapIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={ async () => {
                console.log(parram.row.hotel._id);
                await handleSendEmail(parram.row.hotel.email, parram.row.userName, parram.row._id);
                await handleUpdateStatus(parram.row.hotel._id);
                
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
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
      flex: 0.6,

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
          <MapDialog data={updateData} />
        </DialogContent>
      </Dialog>
    </Stack>
  );
}
