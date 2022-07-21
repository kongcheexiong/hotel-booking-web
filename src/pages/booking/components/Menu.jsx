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

import { counterContext } from "../../../context/counter";
export default function Menu() {
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();

  const [filter ,setFilter] = React.useState('ALL')
  const [isOpen, setOpen]= React.useState(false)

  const {value, setValue} = React.useContext(counterContext)

  return (
    <Stack direction="column" spacing={3}>
      {/** action button */}
      <Stack>
        <Button
          size="small"
          startIcon={<GridAddIcon />}
          disableElevation
          variant="contained"
          sx={{ ...btnStyle, width: "200px" }}
          onClick={()=>setOpen(true)}
        >
          ຈອງຫ້ອງ
        </Button>
      </Stack>
      <hr />
      <Stack direction="row" spacing={3} >
        {/**start date */}
        <Stack>
          <label id="dateOfBirth">ຕັ້ງແຕ່ວັນທີ</label>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="dd/MM/yyyy"
              value={startDate}
              onChange={(value) => {
                const _date = new Date(value);
                console.log(_date.toLocaleDateString("en-GB"));
                const saveDate = _date.toLocaleDateString("en-GB");
                setStartDate(value);
                //setData({
                //  ...data,
                //  birthday: saveDate,
                //});
              }}
              renderInput={(params) => (
                <TextField
                  onChange={
                    (e) => {}
                    ///setData({
                    ///  ...data,
                    ///  birthday: e.target.value,
                    ///})
                  }
                  sx={{ ...textStyle, width: "250px", backgroundColor: 'white' }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        </Stack>
        {/**End date */}
        <Stack>
          <label id="dateOfBirth">ຫາວັນທີ</label>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="dd/MM/yyyy"
              value={endDate}
              onChange={(value) => {
                const _date = new Date(value);
                console.log(_date.toLocaleDateString("en-GB"));
                const saveDate = _date.toLocaleDateString("en-GB");
                setEndDate(value);
                //setData({
                //  ...data,
                //  birthday: saveDate,
                //});
              }}
              renderInput={(params) => (
                <TextField
                  onChange={
                    (e) => {}
                    ///setData({
                    ///  ...data,
                    ///  birthday: e.target.value,
                    ///})
                  }
                  sx={{ ...textStyle, backgroundColor: 'white', width: "250px" }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        </Stack>
        {/**status filter
         * <Stack >
            <label id=""gender>ສະຖານະ</label>
            <Select

              sx={{ ...textStyle, fontFamily: `${font.LAO_FONT}`, height: 35, width: "200px" }}
              value={filter}
            

              onChange={(e) => {
                //setData({ ...data, gender: e.target.value });
                setFilter(e.target.value)
                //setDisplayFilter(e.target.name)
              }}
            >
              <MenuItem sx={{fontFamily: `${font.LAO_FONT}`}} value="ALL">ສະແດງທັງໝົດ</MenuItem>
              <MenuItem sx={{fontFamily: `${font.LAO_FONT}`}}  value="PENDING">ລໍຖ້າແຈ້ງເຂົ້າ</MenuItem>
              <MenuItem sx={{fontFamily: `${font.LAO_FONT}`}}  value="CHECKEDOUT"></MenuItem>
            </Select>
          </Stack>
         */}
        
        
        
       
      </Stack>
      <Stack direction='row' spacing={2} justifyContent='center'>
        {/**search*/ }
        <Stack justifyContent="flex-end" spacing={2}>
          <Button
            size="small"
            startIcon={<SearchIcon />}
            disableElevation
            variant="contained"
            
            sx={{
              ...btnStyle,
              width: "110px",
              "&.MuiButton-root": {
                
                fontFamily: `${font.EN_FONT}`,
                height: 35,
              },
            }}
          >
            Search
          </Button>
          
        </Stack>
        {/**reload */}
        
        <Stack justifyContent="flex-end">
          <Button
          onClick={()=>{
            setValue( value => value+1)
          }}

            size="small"
            startIcon={<CachedIcon />}
            disableElevation
            variant="contained"
            color="success"
            sx={{
              ...btnStyle,
              width: "110px",
              "&.MuiButton-root": {
                width: "100px",
                fontFamily: `${font.EN_FONT}`,
                height: 35,
              },
            }}
          >
            Reload
          </Button>
          
        </Stack>
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
