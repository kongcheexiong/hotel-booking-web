import {
  Avatar,
  Stack,
  Select,
  MenuItem,
  TextField,
  Container,
  Box,
  Button,
} from "@mui/material";
import * as React from "react";

//font color
import { font, color } from "../../../constants";

//style
import { textStyle, btnStyle } from "../../../style";

//check in context
import { CreateCheckInContext } from "../../../context/createCheckIn.context";

export default function UserInfo() {
  const width = "auto";
  const [verify, setVerify] = React.useState("none");
  const [gender, setGender] = React.useState("MALE");
  const [roomType, setRoomType] = React.useState("none");

  const {checkInData, setCheckInData} = React.useContext(CreateCheckInContext)

  return (
    <>
      <Stack direction="column" spacing={2}>
        <Stack direction="column" spacing={2}>
          <Stack>
            <label>ເພດ</label>
            <Select
              sx={{
                ...textStyle,
                fontFamily: `${font.LAO_FONT}`,
                height: 35,
                width: `${width}`,
              }}
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
              variant="outlined"
            >
              <MenuItem sx={{ fontFamily: `${font.LAO_FONT}` }} value="MALE">
                ທ້າວ
              </MenuItem>
              <MenuItem sx={{ fontFamily: `${font.LAO_FONT}` }} value="FEMALE">
                ນາງ
              </MenuItem>
            </Select>
          </Stack>
          <Stack>
            <label>ຊື້</label>
            <TextField
              placeholder="First name"
              variant="outlined"
              sx={{
                ...textStyle,
                width: `${width}`,
                backgroundColor: "white",
              }}
            />
          </Stack>
          <Stack>
            <label>ນາມສະກຸນ</label>
            <TextField
              placeholder="Last name"
              variant="outlined"
              sx={{
                ...textStyle,
                width: `${width}`,
                backgroundColor: "white",
              }}
            />
          </Stack>
          <Stack>
            <label>ເບີໂທລະສັບ</label>
            <TextField
              placeholder="020 XXX XXXXX"
              variant="outlined"
              sx={{
                ...textStyle,
                width: `${width}`,
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
                width: `${width}`,
              }}
              value={verify}
              onChange={(e) => {
                e.preventDefault();

                setVerify(e.target.value);
                console.log(verify);
              }}
              variant="outlined"
            >
              <MenuItem sx={{ fontFamily: `${font.LAO_FONT}` }} value="none">
                ---Select---
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: `${font.LAO_FONT}` }}
                value="PASSPORT"
              >
                Passport
              </MenuItem>
              <MenuItem sx={{ fontFamily: `${font.LAO_FONT}` }} value="IDCARD">
                ID card
              </MenuItem>
            </Select>
          </Stack>
          <div>
            {verify !== "none" ? (
              <Stack>
                <label>ເລກທີ</label>
                <TextField
                  placeholder=""
                  variant="outlined"
                  sx={{
                    ...textStyle,
                    width: `${width}`,
                    backgroundColor: "white",
                  }}
                />
              </Stack>
            ) : null}
          </div>
          <Stack>
            <label>ເລືອກປະເພດຫ້ອງ</label>
            <Select
              sx={{
                ...textStyle,
                fontFamily: `${font.LAO_FONT}`,
                height: 35,
                width: `${width}`,
              }}
              value={roomType}
              onChange={(e) => {
                e.preventDefault();
              }}
              variant="outlined"
            >
              <MenuItem sx={{ fontFamily: `${font.LAO_FONT}` }} value="none">
                ---Select---
              </MenuItem>
            </Select>
          </Stack>
          <Container
            sx={{
              backgroundColor: `${color.GRAY_COLLOR}`,
              padding: "20px",
              height: "auto",
              borderRadius: "15px",
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                backgroundColor: `white`,
                "&:hover": {
                  backgroundColor: `white`,
                  opacity: [0.9, 0.8, 0.7],
                },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "20px",
              }}
            >
              F0001
            </Box>
          </Container>
          <Stack>
            <Button
              size="small"
              disableElevation
              variant="contained"
              sx={{ ...btnStyle, width: "100px" }}
            >
              ແຈ້ງເຂົ້າ
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
