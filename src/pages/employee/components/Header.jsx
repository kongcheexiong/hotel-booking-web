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
import { router,font } from "../../../constants";

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
        
        color="secondary"
        disableElevation
        sx={{ ...btnStyle,"&.MuiButton-root": {
          fontFamily: `${font.EN_FONT}`,
          width: "100px",
          height: 30,
          fontSize: '12px'
        }, }}
        size="small"
        variant="outlined"
        startIcon={<CachedIcon />}
      >
       Reload
      </Button>
      
    </Stack>
    <Divider/>
  </Stack>
  )
}
