import * as react from "react";
import { useNavigate } from "react-router-dom";
//route
import { router, color } from "../../../constants";

//import material ui component
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { MenuItem, Select, Stack, TextField } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

//style
import { btnStyle } from "../../../style";
import { textStyle } from "../../../style";

import { authContext } from "../../../context/authContext";

export const AddRoom = (props) => {
  const { isOpen } = props;
  return (
    <Dialog
      open={isOpen}
      onClose={() => {}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        sx={{ fontFamily: "Noto sans lao", fontSize: "18px" }}
        id="add-new-type"
      >
        {"ເພີ່ມປະເພດຫ້ອງ"}
      </DialogTitle>
      <DialogContent>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure debitis
        dignissimos, voluptates laboriosam nulla necessitatibus dolores, dolorum
        quibusdam in totam cumque, sed nemo illum? Possimus libero in tempore
        asperiores modi?
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ fontFamily: "Noto sans lao" }}
          variant="outlined"
          color="error"
          size="small"
          onClick={togglePopUp}
        >
          ຍົກເລີກ
        </Button>
        <Button
          sx={{ fontFamily: "Noto sans lao" }}
          variant="contained"
          color="primary"
          size="small"
          onClick={togglePopUp}
        >
          ຕົກລົງ
        </Button>
      </DialogActions>
    </Dialog>
  );
};
{
  /**pop up add new type form
   *
   */
}

export default function Header() {
  const [isOpen, setOpen] = react.useState(false);
  const handlePopUp = () => setOpen(!isOpen);
  const navigate = useNavigate();
  // const {auth,setAuth} = react.useContext(authContext)
  return (
    <Stack direction="column" spacing={2}>
      {/**add new type and room */}
      <Stack direction="row" spacing={2}>
        <Button
          onClick={() =>
            navigate(`${router.ROOMTYPEMANAGEMENT}`, { replace: true })
          }
          color="primary"
          disableElevation
          sx={{ ...btnStyle }}
          size="small"
          variant="outlined"
          startIcon={<AddIcon />}
        >
          ເພີ່ມປະເພດຫ້ອງ
        </Button>
        <Button
          onClick={() => {
            handlePopUp();
          }}
          color="primary"
          disableElevation
          sx={{ ...btnStyle }}
          size="small"
          variant="contained"
          startIcon={<AddIcon />}
        >
          ເພີ່ມຫ້ອງ
        </Button>
        {/** show pop up to add new room */}
        <Dialog
          open={isOpen}
          onClose={handlePopUp}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            sx={{
              fontFamily: "Noto sans lao",
              fontSize: "18px",
              backgroundColor: `${color.BLUE_COLOR}`,
              fontWeight: 500,
              color: "white",
            }}
            id="add-new-type"
          >
            {"+ ເພີ່ມຫ້ອງ"}
          </DialogTitle>
          <DialogContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            debitis
            <Stack direction="column" spacing={1}>
              <Stack>
                <label>ລະຫັດ</label>
                <TextField sx={{ ...textStyle, width: "100%" }} />
              </Stack>
              <Stack>
                <label>ເບີຫ້ອງ</label>
                <TextField sx={{ ...textStyle, width: "100%" }} />
              </Stack>
              <Stack>
                <label>ປະເພດຫ້ອງ</label>
                <Select sx={{...textStyle, height: 40,width: '100%'}} value={';lk;lk'} onChange={() => {}}>
                  <MenuItem value={"sfsdf"}>fdsf</MenuItem>
                  <MenuItem value={"sfsdf"}>fdsf</MenuItem>
                  <MenuItem value={"sfsdf"}>fdsf</MenuItem>
                </Select>
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ fontFamily: "Noto sans lao" }}
              variant="outlined"
              color="error"
              size="small"
              onClick={handlePopUp}
            >
              ຍົກເລີກ
            </Button>
            <Button
              sx={{ fontFamily: "Noto sans lao" }}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {}}
            >
              ຕົກລົງ
            </Button>
          </DialogActions>
        </Dialog>
        {/****************************************** */}
      </Stack>
      <hr />

      {/**search area */}
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          sx={{ ...textStyle }}
          id="password"
          placeholder="ລະຫັດຫ້ອງ"
          size="small"
        />
        <Button
          color="primary"
          disableElevation
          sx={{ ...btnStyle }}
          size="medium"
          variant="text"
        >
          ຄົ້ນຫາ
        </Button>
      </Stack>
    </Stack>
  );
}
