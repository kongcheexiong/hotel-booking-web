import { Avatar, Stack, Select, MenuItem, TextField, Container } from "@mui/material";
import * as React from "react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
//icon
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

//font color
import { font, color } from "../../../constants";

//style
import { textStyle } from "../../../style";
import { Box } from "@mui/system";
export default function BookingDetail() {
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [filter, setFilter] = React.useState("none");
  return (
    <div >
  
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={3}>
        <Stack sx={{paddingLeft: '10px'}}>
                <label>ເລືອກປະເພດຫ້ອງ</label>
                <Select
                 //variant='standard'
                  sx={{
                    ...textStyle,
                    fontFamily: `${font.LAO_FONT}`,
                    height: 35,
                    width: `250px`,
                  }}
                  value={filter}
                  onChange={(e) => {
                    //setData({ ...data, gender: e.target.value });
                    setFilter(e.target.value);
                    //setDisplayFilter(e.target.name)
                  }}
                >
                  <MenuItem
                    sx={{ fontFamily: `${font.LAO_FONT}` }}
                    value="none"
                  >
                    None
                  </MenuItem>
                </Select>
              </Stack>
          
        </Stack>
        <Container sx={{
           backgroundColor: `${color.GRAY_COLLOR}`,
            padding:'20px',
            height: '400px',
            borderRadius: '15px'

        }} >
            <Box  sx={{
                width: 60,
                height: 60,
                backgroundColor: `white`,
                '&:hover': {
                  backgroundColor: `white`,
                  opacity: [0.9, 0.8, 0.7],
                },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '20px'


            }} >
                F0001
            </Box>
        </Container>

      </Stack>
    </div>
  );
}
