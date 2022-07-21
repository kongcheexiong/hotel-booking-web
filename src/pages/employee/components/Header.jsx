import { useNavigate } from "react-router-dom";
import * as React from "react";
//material ui

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
//icon
import CancelIcon from "@mui/icons-material/Cancel";
import CachedIcon from '@mui/icons-material/Cached';

//style
import { btnStyle } from "../../../style";

//router
import { router } from "../../../constants";

import { SERVER_URL } from "../../../constants";
import { counterContext } from "../../../context/counter";


export default function Header() {
  const {value , setValue} = React.useContext(counterContext)
  const navigate = useNavigate()
  return (
    <Stack direction="column" spacing={2}>
    <Stack direction="row" spacing={2}>
      {/**add new type btn */}
      <Button
        onClick={()=> navigate(`${router.EMPLOYEEMANAGEMENT}/add`,{replace: true})}
        color="primary"
        disableElevation
        sx={{ ...btnStyle }}
        size="small"
        variant="contained"
        startIcon={<AddIcon />}
      >
       ເພີ່ມຂໍ້ມູນພະນັກງານ
      </Button>
      {/**Reload */}
      <Button
        onClick={()=> {
          setValue( value => value+1)

        }}
        color="success"
        disableElevation
        sx={{ ...btnStyle }}
        size="small"
        variant="contained"
        startIcon={<CachedIcon />}
      >
       Reload
      </Button>
      
    </Stack>
    <Divider/>
  </Stack>
  )
}
