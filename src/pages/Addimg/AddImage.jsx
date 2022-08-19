import * as React from "react";
import { SERVER_URL } from "../../constants";
import axios from "axios";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { Button, Stack } from "@mui/material";
import { btnStyle } from "../../style";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { handleUploadImg } from "../../services/uploadImage";

export default function AddImage() {
  const [images, setImages] = React.useState([]);
  const [files, setFiles] = React.useState();
  const [imageData, setImageData] = React.useState([]);

  const fetchHotels = async () => {
    await axios
      .get(`${SERVER_URL}/api/hotel?id=${localStorage.getItem("hotel")}`)
      .then((res) => {
        console.log(res.data);
        setImages(res.data.images);
      })
      .catch((err) => console.error(err));
  };
  const pushImage = async () => {
    axios
      .put(
        `${SERVER_URL}/api/hotel/add-image?hotel=${localStorage.getItem(
          "hotel"
        )}&images=${imageData.join(",")}`
      )
      .then((res) => {
        console.log(res.data);
        alert("successfully add");
        fetchHotels();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async (item) => {
    axios
    .put(
      `${SERVER_URL}/api/hotel/delete-image?hotel=${localStorage.getItem(
        "hotel"
      )}&image=${item}`
    )
    .then((res) => {
      console.log(res.data);
      alert("successfully deleted");
      fetchHotels();
    })
    .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <Stack>
      <Stack direction="row" spacing={0} alignItems="center">
        <input
          accept="image/png, image/gif, image/jpeg"
          style={{ width: "200px" }}
          name="filefield"
          multiple="multiple"
          type="file"
          onChange={(event) => {
            event.preventDefault();
            const file = event.target.files;
            setFiles(file);
            //const frmdata = new FormData();
            const fileImage = [];
            for (var x = 0; x < file.length; x++) {
              //  frmdata.append("file", file[x]);
              fileImage.push(file[x].name);
            }
            // let stringData = fileImage.map(({value}) => `${value}`).join(',');
            setImageData(fileImage);
          }}
        />
        <Button
          sx={{ ...btnStyle }}
          onClick={() => {
            handleUploadImg(files)
            //
            pushImage();
            console.log(imageData);
          }}
        >
          ເພີ່ມຮູບພາບ
        </Button>
      </Stack>
      <div>
        <div>
          {images?.length > 0 ? (
            <ImageList sx={{ width: "90%", height: "100%" }}>
              {images.map((item, index) => (
                <ImageListItem key={index}>
                  <img
                    src={`${SERVER_URL}/api/image/${item}`}
                    srcSet={`${SERVER_URL}/api/image/${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
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
            
                          handleDelete(item);

                        }}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          ) : null}
        </div>
      </div>
    </Stack>
  );
}
