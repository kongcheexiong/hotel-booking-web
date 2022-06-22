import { AddIcCallOutlined } from "@mui/icons-material";
import { Button, Stack, TextField } from "@mui/material";
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

import { font } from "../../../constants";

export default function Menu() {
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();

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
        >
          ຈອງຫ້ອງ
        </Button>
      </Stack>
      <hr />
      <Stack direction="row" spacing={5}>
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
                  sx={{
                    ...textStyle,
                    width: "250px",
                    backgroundColor: "white",
                  }}
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
                  sx={{
                    ...textStyle,
                    backgroundColor: "white",
                    width: "250px",
                  }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        </Stack>
        {/**search*/}
        <Stack justifyContent="flex-end">
          <Button
            size="small"
            startIcon={<SearchIcon />}
            disableElevation
            variant="contained"
            sx={{
              ...btnStyle,

              "&.MuiButton-root": {
                width: "110px",

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
            size="small"
            startIcon={<CachedIcon />}
            disableElevation
            variant="contained"
            color="success"
            sx={{
              ...btnStyle,
              "&.MuiButton-root": {
                width: "110px",
                fontFamily: `${font.EN_FONT}`,
                height: 35,
              },
            }}
          >
            Reload
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
