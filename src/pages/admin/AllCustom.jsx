
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
  
  export default function AllCustom() {
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
        .get(`${SERVER_URL}/api/online-customer/all`, {
          timeout: 5000,
        })
        .then((res) => {
          console.log(res.data);
          //setTotal(res.data.total);
          setResData(res.data);
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
  
    
  
    const columns = [
        { field: "gender", headerName: "ເພດ", flex: 1,renderCell: param =>{
            if(param.row.gender === 'MALE'){
                return <span>ທ້າວ</span>
            }
            return <span>ນາງ</span>
        }  },
        { field: "firstName", headerName: "ຊື່", flex: 1,  },
        { field: "lastName", headerName: "ນາມສະກຸນ", flex: 1,  },
      
      
      {
        field: "image",
        headerName: "ຮູບ",
        flex: 1,
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
      { field: "village", headerName: "ບ້ານ", flex: 1, sortable: false },
      { field: "district", headerName: "ເມືອງ", flex: 1, sortable: false },
      { field: "province", headerName: "ແຂວງ", flex: 1, sortable: false },
      {
        field: "phone",
        headerName: "ເບີໂທລະສັບ",
        flex: 1,
        sortable: false,
        
      },
      {
        field: "createdAt",
        headerName: "ວັນທີສ້າງລາຍການ",
        flex: 1,
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
  