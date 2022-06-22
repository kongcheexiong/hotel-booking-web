import { Avatar, Stack, Select, MenuItem, TextField } from "@mui/material";
import * as React from "react";

//font
import { font } from "../../constants";

//style
import { textStyle } from "../../style";

export default function AddCheckin() {
    const [verify ,setVerify] = React.useState('none')
    const [gender, setGender] = React.useState('MALE')
  return (
    <Stack direction="column">
        <Stack sx={{backgroundColor: "red"}}>
            <h1>ແຈ້ງເຂົ້າ</h1>
        </Stack>
      {/**user info */}
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2}>
          <Avatar sx={{ height: "70px", width: "70px" }} />
          <Stack direction="column" spacing={2}>
            {/**user name */}
            <Stack direction="row" spacing={4}>
              <Stack>
                <label>ເພດ</label>
                <Select
                  sx={{
                    ...textStyle,
                    fontFamily: `${font.LAO_FONT}`,
                    height: 35,
                    width: "200px",
                  }}
                  value={gender}

                  onChange={(e) => {
                   
                    setGender(e.target.value)
                  }}
                  variant="standard"
                >
                  <MenuItem
                    sx={{ fontFamily: `${font.LAO_FONT}` }}
                    value="MALE"
                  >
                    ທ້າວ
                  </MenuItem>
                  <MenuItem
                    sx={{ fontFamily: `${font.LAO_FONT}` }}
                    value="FEMALE"
                  >
                    ນາງ
                  </MenuItem>
                </Select>
              </Stack>
              <Stack>
                <label>ຊື້</label>
                <TextField
                  placeholder="First name"
                  variant="standard"
                  sx={{
                    ...textStyle,
                    width: "200px",
                    backgroundColor: "white",
                  }}
                />
              </Stack>
              <Stack>
                <label>ນາມສະກຸນ</label>
                <TextField
                  placeholder="Last name"
                  variant="standard"
                  sx={{
                    ...textStyle,
                    width: "200px",
                    backgroundColor: "white",
                  }}
                />
              </Stack>
            </Stack>

            {/**user detail */}
            <Stack direction="row" spacing={4}>
              <Stack>
                <label>ເບີໂທລະສັບ</label>
                <TextField
                  placeholder="020 XXX XXXXX"
                  variant="standard"
                  sx={{
                    ...textStyle,
                    width: "200px",
                    backgroundColor: "white",
                  }}
                />
              </Stack>
              <Stack>
                <label>ເອກະສານອ້າງອີງ</label>
                <Select
                  sx={{
                    ...textStyle,
                    fontFamily: `${font.LAO_FONT}`,
                    height: 35,
                    width: "200px",
                  }}
                  value={verify}

                  onChange={(e) => {
                    //setData({ ...data, gender: e.target.value });
                    //setFilter(e.target.value)
                    //setDisplayFilter(e.target.name)
                    setVerify(e.target.value)
                  }}
                  variant="standard"
                >
                    <MenuItem
                    sx={{ fontFamily: `${font.LAO_FONT}` }}
                    value="none"
                  >
                    ---Select---
                  </MenuItem>
                  <MenuItem
                    sx={{ fontFamily: `${font.LAO_FONT}` }}
                    value="PASSPORT"
                  >
                    Passport
                  </MenuItem>
                  <MenuItem
                    sx={{ fontFamily: `${font.LAO_FONT}` }}
                    value="IDCARD"
                  >
                    ID card
                  </MenuItem>
                </Select>
              </Stack>
              <Stack>
                <label>ເລກທີ</label>
                <TextField
                  placeholder=""
                  variant="standard"
                  sx={{
                    ...textStyle,
                    width: "200px",
                    backgroundColor: "white",
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      {/**user booking detail */}
      <Stack direction="column" spacing={2}></Stack>
    </Stack>
  );
}
