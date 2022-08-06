import { Button, Stack, TextField, Select, MenuItem } from "@mui/material";
import * as React from "react";
import { textStyle, btnStyle } from "../../../style";
import { font } from "../../../constants";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { counterContext } from "../../../context/counter";

import { SERVER_URL } from "../../../constants";

const CheckOutAfter = (props) => {
  return <>ລູກຄ້າມີການແຈ້ງອອກເກີນກໍານົດ {props.price} ມື້</>;
};
const CheckOutBefore = (props) => {
  return <>ລູກຄ້າມີການແຈ້ງອອກກ່ອນກໍານົດ {props.price} ມື້</>;
};

export default function CheckOutComponent(props) {
  const oneDay = 24 * 60 * 60 * 1000;

  const { data } = props;
  const [endDate, setEndDate] = React.useState("");
  const width = "auto";
  const [days, setDays] = React.useState(0);
  const [updateData, setUpdateData] = React.useState(data);

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [err, setErr] = React.useState(false);

  const {value, setValue} = React.useContext(counterContext);

  const checkOut = async (fromID, checkOutDate, fromRoom) => {
    setLoading(true);
    setErr(false);
    setSuccess(false);
    await axios
      .put(
        `${SERVER_URL}/api/check-out?id=${fromID}&checkOutDate=${checkOutDate}&roomId=${fromRoom}`
      )
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setSuccess(true);
      })
      .catch((err) => {
        setErr(true);
        setLoading(false);
        console.log(err);
      });
  };
  React.useEffect(() => {}, []);

  return (
    <Stack spacing={2}>
      <Stack>
        <label htmlFor="id">ຢຶນຢັນທີ່ຈະແຈ້ງອອກຈາກລາຍການຈອງລະຫັດທີ</label>
        <TextField
          disabled
          placeholder="ລະຫັດບິນ"
          defaultValue={data?.billId}
          variant="outlined"
          sx={{ ...textStyle, width: "auto", backgroundColor: "white" }}
        />
      </Stack>
      <Stack>
        <label htmlFor="id">ເບີຫ້ອງ</label>
        <TextField
          disabled
          placeholder="ລະຫັດບິນ"
          defaultValue={data?.room?.roomName}
          variant="outlined"
          sx={{ ...textStyle, width: "auto", backgroundColor: "white" }}
        />
      </Stack>
      <Select
        sx={{
          ...textStyle,
          fontFamily: `${font.LAO_FONT}`,
          height: 35,
          width: `auto`,
        }}
        value={updateData.isPaid}
        onChange={(e) => {
          // setPaid(e.target.value)
          // setCheckInData({ ...checkInData, isPaid: e.target.value })
          setUpdateData({ ...updateData, isPaid: e.target.value });
        }}
        variant="outlined"
      >
        <MenuItem sx={{ fontFamily: `${font.LAO_FONT}` }} value={false}>
          ຍັງບໍໍໄດ້ຈ່າຍ
        </MenuItem>
        <MenuItem sx={{ fontFamily: `${font.LAO_FONT}` }} value={true}>
          ຈ່າຍແລ້ວ
        </MenuItem>
      </Select>

      <Stack>
        <label id="dateOfBirth">ວັນທີແຈ້ງອອກ</label>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            inputFormat="dd/MM/yyyy"
            value={endDate}
            onChange={(value) => {
              const _date = new Date(value);
              setEndDate(value);
              let diffDays = Math.round(
                Math.abs((_date - new Date(data.checkOutDate)) / oneDay)
              );
              setDays(diffDays);

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
                  width: "auto",
                }}
                {...params}
              />
            )}
          />
        </LocalizationProvider>
      </Stack>
      {endDate === "" ? (
        <></>
      ) : new Date(data?.checkOutDate) > endDate ? (
        <CheckOutBefore price={days} />
      ) : new Date(data?.checkOutDate) < endDate ? (
        <CheckOutAfter price={days} />
      ) : null}
      {loading ? (
        <span>loading...</span>
      ) : err ? (
        <span>Something went wrong</span>
      ) : success ? (
        <span>success</span>
      ) : null}
      <Button
        size="small"
        //startIcon={<SearchIcon />}
        disableElevation
        variant="contained"
        sx={{
          ...btnStyle,
          width: "auto",
          "&.MuiButton-root": {
            fontFamily: `${font.LAO_FONT}`,
            height: 35,
          },
        }}
        onClick={() => {
          console.log(days);
          checkOut(data?.billId, endDate, data?.room._id);
          setValue((value) => value + 1);
        }}
      >
        ແຈ້ງອອກ
      </Button>
    </Stack>
  );
}
