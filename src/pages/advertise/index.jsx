import * as React from "react";

import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { btnStyle } from "../../style";

import Image from "../../../nature.jpg";
import { Stack } from "@mui/material";
import { font, router } from "../../constants";
export default function Landing() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" color="inherit">
        <Toolbar>
          <Typography
            color="#1976d2"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => {
              navigate(`/public`);
            }}
          >
            BanHao Booking Platform
          </Typography>

          <Stack direction="row" spacing={2} marginRight="20px">
            <Button variant="outlined" sx={{ ...btnStyle }}>
              ລົງທະບຽນ
            </Button>
            <Button
              variant="contained"
              sx={{ ...btnStyle }}
              onClick={() => {
                navigate(`/`, {
                  replace: true,
                });
              }}
            >
              ເຂົ້າສູ່ລະບົບ
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <div
        style={{
          height: "100vh",

          backgroundImage: `url(${Image})`,

          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack marginTop={20} alignItems="center" justifyContent="center">
          <img
            style={{ borderRadius: "20px" }}
            src="../../img.PNG"
            alt="img"
            height={100}
            width={100}
          />

          <h1
            style={{
              backgroundColor: "white",
              opacity: "0.6",
            }}
          >
            ລະບົບບໍລິຫານຈັດການໂຮງແຮມແບບອອນໄລ
          </h1>
          <h1
            style={{
              backgroundColor: "white",
              opacity: "0.6",
              fontFamily: `${font.EN_FONT}`,
            }}
          >
            Partner of BanHao App
          </h1>
        </Stack>
      </div>
    </Box>
  );
}
