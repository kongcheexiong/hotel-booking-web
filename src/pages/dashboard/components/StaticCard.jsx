import React from "react";
import { Divider, Stack } from "@mui/material";
import { color } from "../../../constants";

function StaticCard(props) {
  return (
    
      <Stack 
        direction="row"
        justifyContent="space-around"        
        sx={{
          backgroundColor: `${color.GRAY_COLLOR}`,
          padding: '10px',
          borderRadius: '15px',
          width: '100%',
          height: '50px',
          
          
        }}

       
      >
        <Stack alignSelf='center' sx={{fontSize: '16px'}}>
         {props.title}
          </Stack>
        <Stack direction='row' sx={{width: '40px'}}>
          <Divider orientation="vertical"/>
          <div style={{marginLeft: '10px', alignSelf:'center', fontSize: '16px'}}>{props.value}</div>
          </Stack>

      </Stack>
  
  );
}

export default StaticCard;
