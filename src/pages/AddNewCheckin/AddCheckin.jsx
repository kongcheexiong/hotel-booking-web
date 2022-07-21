import {
  Avatar,
  Stack,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
//components
import UserInfo from "./components/UserInfo";
import BookingDetail from "./components/BookingDetail";

//font color router
import { font, color, router } from "../../constants";

//style
import { textStyle, btnStyle } from "../../style";

//icon
import CancelIcon from "@mui/icons-material/Cancel";

export default function AddCheckin() {
  const navigate = useNavigate();

  return (
    <Stack direction="column" sx={{}}>
      {/**header */}
      <Stack
        sx={{ backgroundColor: "#1565C0", padding: "0px 10px", color: "white" }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <h3>ແຈ້ງເຂົ້າ</h3>
        <IconButton onClick={() => navigate(`/${router.CHECKIN}`)}>
          <CancelIcon fontSize="large" color="" />
        </IconButton>
      </Stack>
      <div style={{ padding: "10px" }}>
        {/**user info */}
        <UserInfo />
      </div>
      <div
        style={{
          marginTop: "20px",
          //marginLeft: '95px',
          backgroundColor: `${color.GRAY_COLLOR}`,
          padding: "10px",
        }}
      >
        <span style={{ fontSize: "16px" }}>ລາຍລະອຽດການຈອງ</span>
      </div>
      {/**user booking detail */}
      <div style={{ margin: "10px 0px" }}>
        <BookingDetail />
      </div>
      {/* button */}
      <Stack>
        <Button
        size="small"
          
        disableElevation
        variant="contained"
        sx={{ ...btnStyle, width: "200px" }}
       
        >ແຈ້ງເຂົ້າ</Button>
      </Stack>
    </Stack>
  );
}
