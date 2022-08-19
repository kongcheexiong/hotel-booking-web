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
import { font, router, SERVER_URL } from "../../constants";

import StaticCard from "./components/StaticCard";

import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import axios from "axios";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [hotel, setHotel ]= React.useState('')
  const [customer, setCustomer] = React.useState('')

  const [loading,setloading]= React.useState(true)
  const fetchData = async()=>{
    setloading(true)
    axios.get(`${SERVER_URL}/api/admin-dashboard`)
      .then(res=>{
        console.log(res.data)
        setHotel(res.data.hotels)
        setCustomer(res.data.onlineCustomer)
        setloading(false)
      }).catch(err=>{
        console.log(err)
      })
  }
  React.useEffect(()=>{
    fetchData()

  },[])
  return (
    <Box sx={{ flexGrow: 1 }}>
       <Stack direction="row" justifyContent="space-between" spacing={2}>
        {loading? <>Loading...
        </>: <>
        <StaticCard title="ໂຮງແຮມທັງໝົດ" value={hotel} startIcon = {<MapsHomeWorkIcon/>} />
        <StaticCard title="ຜູ້ໃຊ້ແອັບພິເຄຊັ່ນທັງໝົດ" value={customer}  startIcon = {<PeopleAltIcon/>}/>
        
        </>}

         
         
        

        </Stack>
    </Box>
  );
}
