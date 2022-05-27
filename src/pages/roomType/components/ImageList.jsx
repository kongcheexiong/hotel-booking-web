import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import axios from "axios";

export default function TitlebarImageList(props) {
  const { imgData } = props;
  const id = imgData._id;

  const [img, setImg] = React.useState([imgData.images]);
  //console.log(img)
  const [showImg, setShowImg] = React.useState(img[0]);
  console.log(showImg);

  //console.log(img[0])
  const handleDelete = async (item) => {
    setLoading(true);
    var config = {
      method: "put",
      url: "http://localhost:8080/api/remove/room-type-images",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        id: id,
        images: [item],
      },
    };

    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert(response.data);
        setSuccess(true);
        setErr(false);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setErr(true);
        setSuccess(false);
        setLoading(false);
      });
  };

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [err, setErr] = React.useState(false);

  return (
    <ImageList sx={{ width: 500, height: 450 }}>
      {showImg.map((item, index) => (
        <ImageListItem key={index}>
          <img
            src={`http://localhost:8080/api/image/${item}`}
            //srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item}
            loading="lazy"
          />

          <ImageListItemBar
            title={item}
            //subtitle={item.author}
            actionIcon={
              <IconButton
                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                aria-label={`info about ${item}`}
                onClick={() => {
                  setLoading(true);
                  setErr(false);
                  setSuccess(false);

                  console.log(item);
                  console.log(index);
                  handleDelete(item);

                  showImg.splice(index, 1);
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
      {err && <h3>there is an err</h3>}
      {loading ? <h3>Loading...</h3> : null}
    </ImageList>
  );
}
