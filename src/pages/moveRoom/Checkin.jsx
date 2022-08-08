import React from "react";
import Menu from "./components/Menu";
import Table from "./components/Table";

import { Stack } from "@mui/material";

function MoveRoom() {
  return (
    <Stack
      sx={
        {
          //backgroundColor: "#F8F9FA",
          //padding: '30px'
        }
      }
      direction="column"
      spacing={2}
    >
    
      {/* <Menu /> */}
      <hr />
      <Table />
    </Stack>
  );
}

export default MoveRoom;
