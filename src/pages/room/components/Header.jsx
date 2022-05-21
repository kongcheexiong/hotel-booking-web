import * as react from "react";
import { useNavigate } from "react-router-dom";
//route
import { router, color } from "../../../constants";

//import material ui component
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { MenuItem, Select, Stack, TextField } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

//style
import { btnStyle } from "../../../style";
import { textStyle } from "../../../style";

import { authContext } from "../../../context/authContext";

import axios from "axios";

export default function Header() {
  const [isOpen, setOpen] = react.useState(false);
  const handlePopUp = () => setOpen(!isOpen);
  const navigate = useNavigate();
  // const {auth,setAuth} = react.useContext(authContext)
  const hotelID = localStorage.getItem("hotel");

  const [roomTypeData, setRoomTypeData] = react.useState([]);
  const [typeName, setTypeName] = react.useState([]);

  //add new room
  const [roomNumber, setRoomNumber] = react.useState("");
  const [type, setType] = react.useState("");
  const [note, setNote] = react.useState('');
  const [err,setErr] = react.useState(false)
  const [success,setSuccess] = react.useState(false)
  const [loading,setLoading] = react.useState(false)

  const getRoomtypeData = async () => {
    await axios
      .get(
        `http://localhost:8080/api/room-types/skip/0/limit/30?hotelId=${hotelID}`,
        { timeout: 5000 }
      )
      .then((res) => {
        setRoomTypeData(res.data.roomTypes);
        //setloading(false);
        console.log(roomTypeData);
      })
      .catch((err) => {
        console.error(err);
        // setError(true);
      });
  };

  const handleAddNewRoom = async () => {
    setLoading(true)
    axios
      .post(
        "http://localhost:8080/api/create/room",
        {
          hotel: hotelID,
          roomtype: type,
          roomName: roomNumber,
          status: false,
          isDeleted: false,
          note: note,
        },
        {
          timeout: 5000,
        }
      )
      .then((res) => {
        setSuccess(true)
        setLoading(false)

        console.log(res)
      })
      .catch((err) => {
        setErr(true)
        console.error(err)
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
        {/** show pop up to add new room */}
        <Dialog
          open={isOpen}
          onClose={() => {
            handlePopUp();
            setType("");
            setRoomNumber("");
            setNote('')
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            debitis
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
                  {roomTypeData.map((val, index) => {
                    return (
                      <MenuItem key={index} value={val.typeName}>
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
              {err && <h3>there is an error</h3>}
              {loading? <h3>Please wait...</h3>: null}
              {success && <h3>Successfully added</h3>}

            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ fontFamily: "Noto sans lao" }}
              variant="outlined"
              color="error"
              size="small"
              onClick={handlePopUp}
            >
              ຍົກເລີກ
            </Button>
            <Button
              sx={{ fontFamily: "Noto sans lao" }}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {handleAddNewRoom()}}
            >
              ຕົກລົງ
            </Button>
          </DialogActions>
        </Dialog>
        {/****************************************** */}
      </Stack>
      <hr />

      {/**search area */}
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          sx={{ ...textStyle }}
          id="password"
          placeholder="ລະຫັດຫ້ອງ"
          size="small"
        />
        <Button
          color="primary"
          disableElevation
          sx={{ ...btnStyle }}
          size="medium"
          variant="text"
        >
          ຄົ້ນຫາ
        </Button>
      </Stack>
    </Stack>
  );
}
