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

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SummarizeIcon from '@mui/icons-material/Summarize';

import {useReactToPrint} from "react-to-print";
import { PrintComponent } from "./print.component";

export default function Header() {
  const navigate = useNavigate()
  const {value , setValue} = React.useContext(counterContext)
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

 
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
      
      {/**print as pdf */}
      <div
      style={{ display: "none" }}// This make ComponentToPrint show   only while printing
      > 
       <PrintComponent ref={componentRef} />
      </div>
 
      <Button
        onClick={() => {
          //setValue( value => value+1)
          //generatePDF(resData)
          handlePrint()
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

       {/**export as excel
        * 
        * <Button
        onClick={() => {
          //setValue( value => value+1)
        }}
        color="error"
        disableElevation
        sx={{
          ...btnStyle,
          "&.MuiButton-root": {
            fontFamily: `${font.LAO_FONT}`,
            width: "200px",
            fontWeight: "500",
            height: 30,
            fontSize: "14px",
          },
        }}
        size="small"
        variant="outlined"
        startIcon={<SummarizeIcon />}
      >
        export as Excel
      </Button>
        */}
      
     
      
    </Stack>
    <Divider/>
  </Stack>
  )
}
