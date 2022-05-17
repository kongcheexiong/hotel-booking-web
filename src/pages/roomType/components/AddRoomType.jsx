import { Stack, IconButton, Button, TextField } from "@mui/material";

import CancelIcon from "@mui/icons-material/Cancel";
import { styled } from "@mui/material";
import * as React from "react";

import { useNavigate } from "react-router-dom";

import { router } from "../../../constants";

//import style for override material ui components
import { textStyle, btnStyle } from "../../../style";
import "../style.css";
import { ConstructionOutlined } from "@mui/icons-material";

export default function AddRoomType() {
  {
    /**   "hotel":"6270f8b66785821b585ef482",
    "typeName":"VIP11",
    "price":20000,
    "numberOfBed":5,
    "suggestedGuestAllowed":5,
    "note":"good choice",
    "images":["asdf","asdfg"] */
  }
  const hotelId = localStorage.getItem("hotel");
  const initialState = {
    hotel: hotelId,
    typeName: "",
    price: "",
    numberOfBed: "",
    suggestedGuestAllowed: "",
    note: "",
    images: [],
    totoalRoom: 0,
    isDeleted: false,
  };
  const [data, setData] = React.useState(initialState);
  const [typeName, setTypeName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [numOfBed, setNumOfBed] = React.useState("");
  const [suggestedGuestAllowed, setSuggestedGuestAllowed] = React.useState("");
  const [note, setNote] = React.useState("");
  const [images, setImages] = React.useState([]);

  const navigate = useNavigate();
  return (
    <div>
      {/**form header */}
      <Stack
        sx={{ backgroundColor: "#1565C0", padding: "0px 10px", color: "white" }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <h3>ເພີ່ມປະເພດຫ້ອງ</h3>
        <IconButton
          onClick={() =>
            navigate(`${router.ROOMTYPEMANAGEMENT}`, { replace: "true" })
          }
        >
          <CancelIcon fontSize="large" color="" />
        </IconButton>
      </Stack>
      <hr />
      {/**form area */}
      <Stack direction="column" spacing={1}>
        {/**
         *  <Stack>
          <label id="id">ລະຫັດປະເພດຫ້ອງ</label>
          <TextField sx={{ ...textStyle, width: "100%" }} />
        </Stack>
         */}

        <Stack>
          <label id="room">ຫ້ອງ</label>
          <TextField
            onChange={(e) => {
              setData({ ...data, typeName: e.target.value });
            }}
            sx={{ ...textStyle, width: "100%" }}
          />
        </Stack>
        <Stack>
          <label id="note">ໝາຍເຫດ</label>
          <TextField
            onChange={(e) => {
              setData({ ...data, note: e.target.value });
            }}
            sx={{ ...textStyle, width: "100%" }}
          />
        </Stack>
        <Stack>
          <label id="price">ລາຄາ</label>
          <TextField
            onChange={(e) => {
              setData({ ...data, price: e.target.value });
            }}
            sx={{ ...textStyle, width: "100%" }}
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <Stack direction="column">
            <label id="nomOfBed">ຈໍານວນຕຽງ</label>
            <TextField
              onChange={(e) => {
                setData({ ...data, numberOfBed: e.target.value });
              }}
              sx={{ ...textStyle }}
            />
          </Stack>

          <Stack direction="column">
            <label id="nomOfQuest">ຈໍານວນລູກຄ້າແນະນໍາ</label>
            <TextField sx={{ ...textStyle }} />
          </Stack>
        </Stack>

        <span>ເພີ່ມຮູບພາບປະກອບ</span>
        <input
          accept="image/png, image/gif, image/jpeg"
          style={{ width: "200px" }}
          name="filefield"
          multiple="multiple"
          type="file"
          onChange={(event) => {
            event.preventDefault();
            const file = event.target.files;
            //const frmdata = new FormData();
            const fileImage = []
            for (var x = 0; x < file.length; x++) {
            //  frmdata.append("file", file[x]);
              fileImage.push(file[x].name)
            }
            setData({ ...data, images: fileImage });
            
          }}
        />
      </Stack>
      {/**submit button */}
      <Stack sx={{ marginTop: "50px" }} direction="row" justifyContent="center">
        <Button
          onClick={() => alert(JSON.stringify(data))}
          variant="contained"
          sx={{ ...btnStyle }}
        >
          ຕົກລົງ
        </Button>
      </Stack>
    </div>
  );
}
