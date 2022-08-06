import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import axios from "axios";

import { SERVER_URL } from "../../../constants";

export default function TitlebarImageList(props) {
  const { imgData } = props;
  

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [err, setErr] = React.useState(false);

  return (
    <ImageList sx={{ width: 500, height: 450,}}>
       <ImageListItem sx={{
        width: '300',
        minHeight: '400',
        maxHeight: 'auto',
        float: 'left',
        margin: '3px',
        padding: '3px'
       }}>
          <img style={{
            maxWidth: '100%',
            height: 'auto'
          }}
            src={`${SERVER_URL}/api/image/${imgData}`}
            //srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={imgData}
            loading="lazy"
          />

          <ImageListItemBar
            title={imgData}
            
          
          />
        </ImageListItem>
      {err && <h3>Something went wrong</h3>}
      {loading ? <h3>Loading...</h3> : null}
    </ImageList>
  );
}
