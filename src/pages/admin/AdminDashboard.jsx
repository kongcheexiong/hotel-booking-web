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

import StaticCard from "./components/StaticCard";

import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

export default function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
       <Stack direction="row" justifyContent="space-between" spacing={2}>
          <StaticCard title="ໂຮງແຮມທັງໝົດ" value={3} startIcon = {<MapsHomeWorkIcon/>} />
          <StaticCard title="ຜູ້ໃຊ້ແອັບພິເຄຊັ່ນທັງໝົດ" value={1}  startIcon = {<PeopleAltIcon/>}/>
         
        

        </Stack>
    </Box>
  );
}
