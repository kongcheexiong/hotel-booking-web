import { useNavigate } from "react-router-dom";
import * as React from "react";
//material ui

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
//icon
import CancelIcon from "@mui/icons-material/Cancel";

//style
import { btnStyle } from "../../../style";

//router
import { router } from "../../../constants";

export default function Header() {
  return (
    <Stack direction="column" spacing={2}>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      {/**add new type btn */}
      <Button
        onClick={()=> {}}
        color="primary"
        disableElevation
        sx={{ ...btnStyle }}
        size="small"
        variant="contained"
        startIcon={<AddIcon />}
      >
       ເພີ່ມຂໍ້ມູນພະນັກງານ
      </Button>
      
    </Stack>
    <hr />
  </Stack>
  )
}
