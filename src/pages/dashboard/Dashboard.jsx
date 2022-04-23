import React from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";

// auth
import Auth from "../../auth.js";
import { router } from "../../constants/index.js";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <Stack direction='column' spacing={1} >
        {/**static card */}
        {/**new shop and income */}
        {/**service info */}

      </Stack>
    </div>
  );
}

export default Dashboard;
