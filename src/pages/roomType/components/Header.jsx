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

//component


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
        {/**
         *   <IconButton
          onClick={() =>
            navigate(`${router.ROOMMAGEMENT}`, { replace: "true" })
          }
        >
          <CancelIcon fontSize="large" color="error" />
        </IconButton>
         */}
      

        {/**cencel btn */}
      </Stack>
      {/**pop up add new type form 
       *       <Dialog
      open={isOpen}
      onClose={togglePopUp}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{fontFamily: 'Noto sans lao', fontSize: '18px'}} id="add-new-type">{"ເພີ່ມປະເພດຫ້ອງ"}</DialogTitle>
      <DialogContent>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure debitis dignissimos, voluptates laboriosam nulla necessitatibus dolores, dolorum quibusdam in totam cumque, sed nemo illum? Possimus libero in tempore asperiores modi?
      </DialogContent>
      <DialogActions>
        <Button sx={{fontFamily: 'Noto sans lao'}} variant="outlined" color="error" size="small" onClick={togglePopUp}>ຍົກເລີກ</Button>
        <Button sx={{fontFamily: 'Noto sans lao'}} variant="contained" color="primary" size="small" onClick={togglePopUp}>ຕົກລົງ</Button>
      </DialogActions>
    </Dialog>
      */}

     

      <hr />
    </Stack>
  );
}
