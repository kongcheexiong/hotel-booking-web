import React from "react";
import { Stack } from "@mui/material";

function StaticCard() {
  return (
    <div style={{
        padding: '5px'
    }}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
      ></Stack>
    </div>
  );
}

export default StaticCard;
