import { useNavigate } from "react-router-dom";
import * as React from "react";
//material ui

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
//icon
import CancelIcon from "@mui/icons-material/Cancel";
import CachedIcon from "@mui/icons-material/Cached";

//style
import { btnStyle } from "../../../style";

//router
import { router, font } from "../../../constants";

import { counterContext } from "../../../context/counter";
import { roomTypeContext } from "../../../context/roomType.context";

//component

//import {SERVER_URL} from '../../../constants/index'

export default function Header() {
  const { roomType, setRoomTytpe } = React.useContext(roomTypeContext);
  const { value, setValue } = React.useContext(counterContext);
  const navigate = useNavigate();
  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" alignItems="center" spacing={2}>
        {/**add new type btn */}
        <Button
          onClick={() => navigate(`${router.ROOMTYPEMANAGEMENT}/add`)}
          color="primary"
          disableElevation
          sx={{ ...btnStyle }}
          size="small"
          variant="contained"
          startIcon={<AddIcon />}
        >
          ເພີ່ມປະເພດຫ້ອງ
        </Button>
        {/**reload btn */}
        <Button
          onClick={() => {
            //setRoomType([]);

            setValue((value) => value + 1);
          }}
          disableElevation
          color="secondary"
          variant="outlined"
          size="small"
          sx={{
            ...btnStyle,
            "&.MuiButton-root": {
              fontFamily: `${font.EN_FONT}`,
              width: "100px",
              height: 30,
              fontSize: "12px",
            },
          }}
          startIcon={<CachedIcon />}
        >
          reload
        </Button>
      </Stack>

      <Divider />
    </Stack>
  );
}
