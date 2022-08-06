import React from "react";
import { Divider, Stack } from "@mui/material";
import { color } from "../../../constants";

function StaticCard(props) {
  return (
    <Stack
      direction="column"
      justifyContent="space-around"
      sx={{
        backgroundColor: `${color.GRAY_COLLOR}`,
        padding: "10px",
        borderRadius: "15px",
        width: "100%",
        height: "150px",
      }}
    >
      <Stack direction='column' justifyContent='center'  sx={{ fontSize: "20px" }}>
        
        <Stack direction='row' spacing={2} alignSel='center' alignItems='center' justifyContent='center' sx={{height: '50px' }}> 
        {props.startIcon}
        <div>{props.title}</div>
        
        </Stack>
        <Divider orientation="horizontal" />
        <Stack alignItems='center' justifyContent='center' sx={{height: '50px' }}> {props.value}</Stack>
      </Stack>
    </Stack>
  );
}

export default StaticCard;
