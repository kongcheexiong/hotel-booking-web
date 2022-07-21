import { useNavigate } from "react-router-dom";
import * as React from "react";
//material ui

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
//icon
import CancelIcon from "@mui/icons-material/Cancel";

//style
import { btnStyle } from "../../../style";

//router
import { router } from "../../../constants";

//component


//import {SERVER_URL} from '../../../constants/index'


export default function Header() {

  const navigate = useNavigate();
  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {/**add new type btn */}
        <Button
          onClick={()=> navigate(`${router.ROOMTYPEMANAGEMENT}/add`)}
          color="primary"
          disableElevation
          sx={{ ...btnStyle }}
          size="small"
          variant="contained"
          startIcon={<AddIcon />}
        >
          ເພີ່ມປະເພດຫ້ອງ
        </Button>
      </Stack>

      <Divider/>
    </Stack>
  );
}
