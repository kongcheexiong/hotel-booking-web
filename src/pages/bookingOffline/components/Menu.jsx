import { AddIcCallOutlined, DeleteForever } from "@mui/icons-material";
import { Button, Stack, TextField, Select, MenuItem, IconButton } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

import { GridAddIcon } from "@mui/x-data-grid";
import * as React from "react";

//icon
import SearchIcon from "@mui/icons-material/Search";
import CachedIcon from "@mui/icons-material/Cached";

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

//import style
import { btnStyle, textStyle } from "../../../style";

import { font,color } from "../../../constants";

import { counterContext } from "../../../context/counter";
import AddNewBookingDialog from "./AddNewBookingDialog";

export default function Menu() {
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();

  const [filter ,setFilter] = React.useState('ALL')
  const [isOpen, setOpen]= React.useState(false)

  const {value, setValue} = React.useContext(counterContext)

  return (
    <Stack direction="column" spacing={3}>
      {/** action button */}
      <Stack direction='row' spacing = {2}>
        <Button
          size="small"
          startIcon={<GridAddIcon />}
          disableElevation
          color='secondary'
          variant="contained"
          
          onClick={()=>{
           // setValue(value => value+1)
           setOpen(true)
          }}
          sx={{...btnStyle,
            "&.MuiButton-root": {
              fontFamily: `${font.LAO_FONT}`,
              width: '100px'

          }
          }}
        >
          ຈອງຫ້ອງ
        </Button>
        <Button
          size="small"
          startIcon={<CachedIcon />}
          disableElevation
          color='success'
          variant="outlined"
          
          onClick={()=>{
           setValue(value => value+1)
           //setOpen(true)
          }}
          sx={{...btnStyle,
            "&.MuiButton-root": {
              fontFamily: `${font.EN_FONT}`,
              width: '100px'

          }
          }}
        >
          reload
        </Button>
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
      </Stack>
      
      {/** add new booking dialog */}
      <Dialog
          open={isOpen}
          onClose={() => {
            setOpen(false)
            
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
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
            {"+ ຈອງຫ້ອງ"}
            <IconButton onClick={()=>{
               setOpen(false)

            }}>
              <ClearIcon/>
            </IconButton>

            </Stack>
            
          </DialogTitle>
          <br/>
          <DialogContent>
         
            <AddNewBookingDialog/>
            
          </DialogContent>
     
        </Dialog>

      
    </Stack>
  );
}
