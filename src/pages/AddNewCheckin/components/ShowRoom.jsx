import * as React from "react";
import { styled } from "@mui/material/styles";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { btnStyle } from "../../../style";
import { font } from "../../../constants";
import isValid from "date-fns/isValid";

import { CreateCheckInContext } from "../../../context/createCheckIn.context";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(2),
    border: 0,
    flexWrap: "wrap",
    flexDirection: "row",

    justifyContent: "flex-start",
    alignItems: "center",

    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export default function CustomizedDividers(props) {
    const {rooms} = props
  
  const [ selectedRoom, setSelectedRoom] = React.useState("");

  const { newCheckIn, setNewCheckIn} = React.useContext(CreateCheckInContext)

  const handleSelectRoom = (event, newRoom) => {
    setSelectedRoom(newRoom);
  };
  

  return (
    <div>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: "wrap",
        }}
      >
        <StyledToggleButtonGroup
          size="small"
          value={selectedRoom}
          exclusive
          onChange={()=>{
            handleSelectRoom();
            setNewCheckIn({...newCheckIn, room: selectedRoom})
          }}
          aria-label="text alignment"
        >
          
          {rooms?.map((val, idx) => {
            return <ToggleButton
              value={val._id}
              aria-label="left aligned"
              alignItems="center"
              justifyContent="center"
              sx={{
                fontFamily: `${font.LAO_FONT}`,
              }}
            >
                {val.roomName}
            </ToggleButton>;
          })}
        </StyledToggleButtonGroup>
      </Paper>
    </div>
  );
}
