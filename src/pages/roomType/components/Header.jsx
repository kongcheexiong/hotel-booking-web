import { useNavigate } from "react-router-dom";
import * as React from "react";
//material ui

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
//icon
import CachedIcon from "@mui/icons-material/Cached";

//style
import { btnStyle } from "../../../style";

//router
import { router, font } from "../../../constants";

import { counterContext } from "../../../context/counter";
import { roomTypeContext } from "../../../context/roomType.context";

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import { PrintComponent } from "./PrintComponent";

import {useReactToPrint} from "react-to-print";


//component

//import {SERVER_URL} from '../../../constants/index'

export default function Header() {
  const { roomType, setRoomTytpe } = React.useContext(roomTypeContext);
  const { value, setValue } = React.useContext(counterContext);
  const navigate = useNavigate();

  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" alignItems="center" spacing={2}>
        {/**add new type btn */}
        <Button
          onClick={() => navigate(`${router.ROOMTYPEMANAGEMENT}/add`)}
          color="primary"
          disableElevation
          sx={{ ...btnStyle }}
          size="small"
          variant="contained"
          startIcon={<AddIcon />}
        >
          ເພີ່ມປະເພດຫ້ອງ
        </Button>
        {/**reload btn */}
        <Button
          onClick={() => {
            //setRoomType([]);

            setValue((value) => value + 1);
          }}
          disableElevation
          color="secondary"
          variant="outlined"
          size="small"
          sx={{
            ...btnStyle,
            "&.MuiButton-root": {
              fontFamily: `${font.EN_FONT}`,
              width: "100px",
              height: 30,
              fontSize: "12px",
            },
          }}
          startIcon={<CachedIcon />}
        >
          reload
        </Button>
        <div
      style={{ display: "none" }}// This make ComponentToPrint show   only while printing
      > 
       <PrintComponent ref={componentRef} />
      </div>
 
      <Button
        onClick={() => {
          //setValue( value => value+1)
          //generatePDF(resData)
          handlePrint()
        }}
        color="error"
        disableElevation
        sx={{
          ...btnStyle,
          "&.MuiButton-root": {
            fontFamily: `${font.LAO_FONT}`,
            width: "150px",
            fontWeight: "500",
            height: 30,
            fontSize: "14px",
          },
        }}
        size="small"
        variant="outlined"
        startIcon={<PictureAsPdfIcon />}
      >
        ນໍາອອກເປັນ PDF
      </Button>


      </Stack>

      <Divider />
    </Stack>
  );
}
