import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { font } from "../../../constants";

import { RegisterProgressContext } from "../../../context/registerProgress.context";


const steps = ["ຂໍ້ມູນເຈົ້າຂອງໂຮງແຮມ", "ລາຍລະອຽດໂຮງແຮມ", "ສໍາເລັດ"];


export default function VerticalStepper(props) {
    const {RegisterProgress, setRegisterProgress} = React.useContext(RegisterProgressContext)
   
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper orientation="vertical" activeStep={RegisterProgress}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              sx={{
                "& .MuiStepLabel-label": {
                  fontFamily: `${font.LAO_FONT}`,
                },
              }}
              
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
