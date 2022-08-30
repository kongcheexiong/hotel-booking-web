import * as react from "react";
import { useNavigate } from "react-router-dom";
//route
import { router, color, font } from "../../../constants";

//import material ui component
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { Divider, MenuItem, Select, Stack, TextField } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CachedIcon from "@mui/icons-material/Cached";

//style
import { btnStyle } from "../../../style";
import { textStyle } from "../../../style";

import { authContext } from "../../../context/authContext";
import { counterContext } from "../../../context/counter";
import { SERVER_URL } from "../../../constants";

import { roomContext } from "../../../context/room.context";

import axios from "axios";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { PrintComponent } from "./PrintComponent";
import { PrintContext } from "../../../context/print.context";
import { useReactToPrint } from "react-to-print";

export default function Header() {
  const { room, setRoom } = react.useContext(roomContext);

  const [isOpen, setOpen] = react.useState(false);
  const handlePopUp = () => setOpen(!isOpen);
  const navigate = useNavigate();
  // const {auth,setAuth} = react.useContext(authContext)
  const { value, setValue } = react.useContext(counterContext);
  const hotelID = localStorage.getItem("hotel");

  const [roomTypeData, setRoomTypeData] = react.useState([]);
  const [typeName, setTypeName] = react.useState([]);

  //add new room
  const [roomNumber, setRoomNumber] = react.useState("");
  const [type, setType] = react.useState("");
  const [note, setNote] = react.useState("");
  const [err, setErr] = react.useState(false);
  const [success, setSuccess] = react.useState(false);
  const [loading, setLoading] = react.useState(false);

  const componentRef = react.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const getRoomtypeData = async () => {
    await axios
      .get(`${SERVER_URL}/api/room-types/skip/0/limit/30?hotelId=${hotelID}`, {
        timeout: 40000,
      })
      .then((res) => {
        setRoomTypeData(res.data.totalRoomTypes);
        //setloading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
        // setError(true);
      });
  };

  const handleAddNewRoom = async () => {
    setLoading(true);
    await axios
      .post(
        `${SERVER_URL}/api/create/room`,
        {
          hotel: hotelID,
          roomType: type,
          roomName: roomNumber,
          status: false,
          isDeleted: false,
          note: note,
        },
        {
          timeout: 40000,
        }
      )
      .then((res) => {
        setSuccess(true);
        setLoading(false);
        setValue((value) => value + 1);

        console.log(res);
      })
      .catch((err) => {
        setErr(true);
        console.error(err);
      });
  };

  react.useEffect(() => {
    getRoomtypeData();
    //getTypeName();
  }, []);

  return (
    <Stack direction="column" spacing={2}>
      {/**add new type and room */}
      <Stack direction="row" spacing={2}>
        <Button
          onClick={() =>
            navigate(`${router.ROOMTYPEMANAGEMENT}`, { replace: true })
          }
          color="primary"
          disableElevation
          sx={{ ...btnStyle }}
          size="small"
          variant="outlined"
          startIcon={<AddIcon />}
        >
          ເພີ່ມປະເພດຫ້ອງ
        </Button>
        <Button
          onClick={() => {
            handlePopUp();
          }}
          color="primary"
          disableElevation
          sx={{ ...btnStyle }}
          size="small"
          variant="contained"
          startIcon={<AddIcon />}
        >
          ເພີ່ມຫ້ອງ
        </Button>

        <Button
          onClick={() => {
            setRoom([]);

            setValue((value) => value + 1);
          }}
          disableElevation
          variant="outlined"
          color="secondary"
          startIcon={<CachedIcon />}
          sx={{
            ...btnStyle,
            "&.MuiButton-root": {
              fontFamily: `${font.EN_FONT}`,
              width: "100px",
              height: 30,
              fontSize: "12px",
            },
          }}
        >
          reload
        </Button>
        <div
          style={{ display: "none" }} // This make ComponentToPrint show   only while printing
        >
          <PrintComponent ref={componentRef} />
        </div>

        <Button
          onClick={() => {
            //setValue( value => value+1)
            //generatePDF(resData)
            handlePrint();
          }}
          color="error"
          disableElevation
          sx={{
            ...btnStyle,
            "&.MuiButton-root": {
              fontFamily: `${font.LAO_FONT}`,
              width: "150px",
              fontWeight: "500",
              height: 30,
              fontSize: "14px",
            },
          }}
          size="small"
          variant="outlined"
          startIcon={<PictureAsPdfIcon />}
        >
          ນໍາອອກເປັນ PDF
        </Button>
        {/** show pop up to add new room */}
        <Dialog
          open={isOpen}
          onClose={() => {
            setSuccess(false);
            setErr(false);
            setLoading(false);
            handlePopUp();
            setType("");
            setRoomNumber("");
            setNote("");
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
            {"+ ເພີ່ມຫ້ອງ"}
          </DialogTitle>
          <DialogContent>
          
            <Stack direction="column" spacing={1}>
              <Stack>
                <label>ເບີຫ້ອງ</label>
                <TextField
                  onChange={(e) => setRoomNumber(e.target.value)}
                  sx={{ ...textStyle, width: "100%" }}
                />
              </Stack>
              <Stack>
                <label>ປະເພດຫ້ອງ</label>
                <Select
                  sx={{ ...textStyle, height: 40, width: "100%" }}
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  {roomTypeData?.map((val) => {
                    return (
                      <MenuItem key={val._id} value={val._id}>
                        {val.typeName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Stack>
              <Stack>
                <label>ໝາຍເຫດ</label>
                <TextField
                  onChange={(e) => setNote(e.target.value)}
                  sx={{ ...textStyle, width: "100%" }}
                />
              </Stack>
              {loading ? <h3>Please wait...</h3> : null}
              {err && <h3>Something went wrongor</h3>}

              {success && <h3>Successfully added</h3>}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ fontFamily: "Noto sans lao" }}
              variant="outlined"
              color="error"
              size="small"
              onClick={
                console.log(roomTypeData)
                //handlePopUp()
              }
            >
              ຍົກເລີກ
            </Button>
            <Button
              sx={{ fontFamily: "Noto sans lao" }}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                // console.log({
                //   hotel: hotelID,
                //   roomType: type,
                //   roomName: roomNumber,
                //   status: false,
                //   isDeleted: false,
                //   note: note,
                // });
                if (loading) return;
                handleAddNewRoom();
              }}
            >
              ຕົກລົງ
            </Button>
          </DialogActions>
        </Dialog>
        {/****************************************** */}
      </Stack>
      <Divider />

      {/**search area */}
    </Stack>
  );
}
