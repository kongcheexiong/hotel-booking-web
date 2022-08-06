import { AddIcCallOutlined } from "@mui/icons-material";
import { Button, Stack, TextField, Select, MenuItem } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { GridAddIcon } from "@mui/x-data-grid";
import * as React from "react";

//icon
import SearchIcon from "@mui/icons-material/Search";
import CachedIcon from "@mui/icons-material/Cached";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

//import style
import { btnStyle, textStyle } from "../../../style";

import { font,color } from "../../../constants";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import { counterContext } from "../../../context/counter";
import { useReactToPrint } from "react-to-print";
import { PrintComponent } from "./PrintComponent";


export default function Menu() {
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();

  const [filter ,setFilter] = React.useState('ALL')
  const [isOpen, setOpen]= React.useState(false)

  const {value, setValue} = React.useContext(counterContext)

  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


  return (
    <Stack direction="column" spacing={3}>
      {/** action button */}
      <Stack direction='row' spacing={2}>
        <Button
          size="small"
          startIcon={<GridAddIcon />}
          disableElevation
          color='secondary'
          variant="outlined"
          
          onClick={()=>{
            setValue(value => value+1)
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
        <div
          style={{ display: "none" }} // This make ComponentToPrint show   only while printing
        >
          <PrintComponent ref={componentRef}  />
        </div>
        <Button
          size="small"
          startIcon={<PictureAsPdfIcon />}
          disableElevation
          color='error'
          variant="outlined"
          
          onClick={()=>{
            //setValue(value => value+1)
            handlePrint()
          }}
          sx={{...btnStyle,
            "&.MuiButton-root": {
              fontFamily: `${font.LAO_FONT}`,
              width: '150px'

          }
          }}
        >
          ລາຍງານຂໍ້ມູນ
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
            {"+ ເພີ່ມຫ້ອງ"}
          </DialogTitle>
          <DialogContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            debitis
            <Stack direction="column" spacing={1}>
              <Stack>
                <label>ເບີຫ້ອງ</label>
                <TextField
                  onChange={(e) => {}}
                  sx={{ ...textStyle, width: "100%" }}
                />
              </Stack>
              <Stack>
                <label>ປະເພດຫ້ອງ</label>
                <Select
                  sx={{ ...textStyle, height: 40, width: "100%" }}
                 // value={}
                  onChange={(e) => {
                    //setType(e.target.value);

                  }}
                >
                  <MenuItem value='1'>
                        VIP01
                  </MenuItem>
                  {/*roomTypeData.map((val) => {
                    return (
                      <MenuItem key={val.roomType._id} value={val.roomType._id}>
                        {val.roomType.typeName}
                      </MenuItem>
                    );
                  })*/}
                </Select>
              </Stack>
              <Stack>
                <label>ໝາຍເຫດ</label>
                <TextField
                  onChange={(e) => {}}
                  sx={{ ...textStyle, width: "100%" }}
                />
              </Stack>
              
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ fontFamily: "Noto sans lao" }}
              variant="outlined"
              color="error"
              size="small"
              onClick= {()=> setOpen(false)}
            >
              ຍົກເລີກ
            </Button>
            <Button
              sx={{ fontFamily: "Noto sans lao" }}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
               
              }}
            >
              ຕົກລົງ
            </Button>
          </DialogActions>
        </Dialog>

      
    </Stack>
  );
}
