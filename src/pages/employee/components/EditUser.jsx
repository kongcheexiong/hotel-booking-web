import {
    Stack,
    IconButton,
    Button,
    TextField,
    Alert,
    Select,
    MenuItem,
  } from "@mui/material";
  import { SERVER_URL } from "../../../constants";
  ///import { roomTypeContext } from "../RoomType.context";
  
  import CancelIcon from "@mui/icons-material/Cancel";
  import { styled } from "@mui/material";
  import * as React from "react";
  import axios from "axios";
  
  import { useNavigate } from "react-router-dom";
  
  import { router } from "../../../constants";
  
  //import style for override material ui components
  import { textStyle, btnStyle, datetimeStyle } from "../../../style";
  
  import { Co2Sharp, ConstructionOutlined, TurnedIn } from "@mui/icons-material";
  import CircularProgress from "@mui/material/CircularProgress";
  import { handleUploadImg } from "../../../services/uploadImage/index";
  
  import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
  import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
  import { DatePicker } from "@mui/x-date-pickers/DatePicker";
  import { MobileDatePicker } from "@mui/x-date-pickers";
  
  import "../style.css";
  import { borderRadius } from "@mui/system";
  
  import {font} from '../../../constants/index'

  import { counterContext } from "../../../context/counter";
  

export default function EditUser(props) {

    const [data, setData] = React.useState(props.data)

    const {value, setValue} = React.useContext(counterContext)

    const navigate = useNavigate();
    const hotelID = localStorage.getItem("hotel");
  
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [err, setErr] = React.useState(false);
  
    const [files, setFiles] = React.useState();
    
  
    const [date, setDate] = React.useState("");

    const handleSubmit = async () =>{
      let updateData = {
        id: data._id,
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          birthday: data.birthday,
          village: data.village,
          city: data.city,
          province: data.province,
          phone: data.phone,
          image: data.image
        }
      }
      
      let config = {
        method: 'put',
        url: `${SERVER_URL}/api/update/user`,
        headers: { 
          'Content-Type': 'application/json'
        },
        timeout: 5000,
        data : updateData
      };
      
      axios(config)
      .then(function (response) {
        console.log(response.data);
        
        
        setLoading(false)
        setErr(false)
        setSuccess(true)
        setValue(value => value+1)
        alert('Updated Successfully')
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
    React.useEffect(()=>{
        console.log(data)
    },[])

  return (
    <div>
        <div
          style={{
            display: "flex",
            flexDirection: 'column',
            //gridTemplateColumns: "auto auto auto",
            columnGap: "30px",
          }}
        >
           <Stack width="100%">
            <label id=""gender>ເພດ</label>
            <Select

              sx={{ ...textStyle, fontFamily: `${font.LAO_FONT}`, height: 35, width: "100%" }}
              value={data.gender}
              onChange={(e) => {
                setData({ ...data, gender: e.target.value });
              }}
            >
              <MenuItem sx={{fontFamily: `${font.LAO_FONT}`}} value="MALE">ຊາຍ</MenuItem>
              <MenuItem sx={{fontFamily: `${font.LAO_FONT}`}}  value="FEMALE">ຍິງ</MenuItem>
            </Select>
          </Stack>
          <Stack sx={{ width: "100%" }}>
            <label id="firstName">ຊື່</label>
            <TextField
            defaultValue={data.firstName}
              onChange={(e) => {
               setData({ ...data, firstName: e.target.value });
              }}
              sx={{ ...textStyle, width: "100%" }}
            />
          </Stack>
          <Stack sx={{ width: "100%" }}>
            <label id="lastName">ນາມສະກຸນ</label>
            <TextField
            defaultValue={data.lastName}
              onChange={(e) => {
                setData({ ...data, lastName: e.target.value });
              }}
              sx={{ ...textStyle, width: "100%" }}
            />
          </Stack>
          <Stack>
            <Stack>
              <label id="dateOfBirth">ວັນເດືອນປີເກີດ</label>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  inputFormat = 'dd/MM/yyyy'
                  value={data.birthday}
                  onChange={(value) => {
                    const _date = new Date(value);
                    console.log(_date.toLocaleDateString("en-GB"));
                    const saveDate = _date.toLocaleDateString("en-GB")
                  setDate(value);
                   setData({
                     ...data,
                     birthday: value,
                   });
                  }}
                  renderInput={(params) => (
                    <TextField
                      sx={{ ...textStyle, width: "100%" }}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </Stack>
          </Stack>

          <Stack width="100%">
            <label id="village">ບ້ານ</label>
            <TextField
            defaultValue={data.village}
              onChange={(e) => {
                setData({ ...data, village: e.target.value });
              }}
              sx={{ ...textStyle, width: "100%" }}
            />
          </Stack>
          <Stack width="100%">
            <label id="city">ເມືອງ</label>
            <TextField
            defaultValue={data.city}

              onChange={(e) => {
                setData({ ...data, city: e.target.value });
              }}
              sx={{ ...textStyle, width: "100%" }}
            />
          </Stack>

          <Stack width="100%">
            <label id="province">ແຂວງ</label>
            <TextField
            defaultValue={data.province}
              onChange={(e) => {
               setData({ ...data, province: e.target.value });
              }}
              sx={{ ...textStyle, width: "100%" }}
            />
          </Stack>

          <Stack>
            <label id="phone">ເບີໂທລະສັບ</label>
            <TextField
            defaultValue={data.phone}
              onChange={(e) => {
               setData({ ...data, phone: e.target.value });
              }}
              sx={{ ...textStyle, width: "100%" }}
            />
          </Stack>
          
        </div>

        <span>ເພີ່ມຮູບພາບປະກອບ</span>
        <Stack>
          <input
            accept="image/png, image/gif, image/jpeg"
            style={{ width: "200px" }}
            name="filefield"
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
             setData({ ...data, image: fileImage[0] });
            }}
          />
          <br />

          {err ? (
            <Alert severity="error">
              This is an error alert — check it out!
            </Alert>
          ) : null}
          {loading ? <CircularProgress /> : null}
          {success ? (
            <Alert severity="success">
              This is a success alert — check it out!
            </Alert>
          ) : null}
        </Stack>

        {/**submit button */}
      <Stack sx={{ marginTop: "50px" }} direction="row" justifyContent="">
        <Button
          onClick={async () => {
           // console.log(data)
           setLoading(true);
           setErr(false);
           setSuccess(false)
          await handleSubmit();
          await handleUploadImg(files)
           console.log(data);
          }}
          variant="contained"
          sx={{ ...btnStyle }}
        >
          ຕົກລົງ
        </Button>
      </Stack>

    </div>
  )
}
