import * as React from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Stack, Dialog, DialogTitle, DialogContent } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { Chip } from "@mui/material";

import { font } from "../../../constants/index";
import { datagridSx } from "../../../style";

import { useFormatDate } from "../../../services/formateDate";

import { SERVER_URL } from "../../../constants/index";

export default function Table() {
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

  const fetchData = async () => {
    setloading(true);
    setSuccess(false);
    setErr(false);
    await axios
      .get(
        `${SERVER_URL}/api/users/skip/0/limit/30?hotelId=${hotelId}`,
        { timeout: 5000 }
      )
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
                // console.log(resData)
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => {
                console.log();

                // console.log(resData)
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Stack>
        );
      },
    },
    { field: "_id", headerName: "ລະຫັດ", width: 50 },
    { field: "userName", headerName: "ຜູ້ໃຊ້", flex: 1, sortable: false },
    {
      field: "image",
      headerName: "ຮູບ",
      width: 50,
      sortable: false,
      renderCell: (parram) => {
        return (
          <div
            className="previewImg"
            onClick={() => {
              console.log(parram.row.image)
              handlePopUpImg();
              setImgData(parram.row.image);
            }}
          >
            {parram.row.image}
          </div>
        );
      },
    },
    { field: "firstName", headerName: "ຊື່", flex: 1, sortable: false },
    { field: "lastName", headerName: "ນາມສະກຸນ", flex: 1, sortable: false },
    {
      field: "birthday",
      headerName: "ວັນເດືອນປີເກີດ",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        const date = useFormatDate(params.row.birthday);
        return <span>{date}</span>;
      },
    },
    { field: "village", headerName: "ບ້ານ", flex: 1, sortable: false },
    { field: "city", headerName: "ເມືອງ", flex: 1, sortable: false },
    { field: "province", headerName: "ແຂວງ", flex: 1, sortable: false },
    { field: "phone", headerName: "ເບີໂທວະສັບ", flex: 1, sortable: false },
    { field: "role", headerName: "Role", width: 60 },
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
  }, []);

  return (
    <div>
      {loading && <h1>loading</h1>}
      {err && <h1>there is an error</h1>}
      {success && (
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
              {/** <TitlebarImageList imgData={imgData} />*/}
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
