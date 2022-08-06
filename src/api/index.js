import axios from "axios";
import * as react from "react";

import { SERVER_URL } from "../constants";
const timeOut = 40000;
const hotelID = localStorage.getItem("hotel");

//context

///fetch room by roomtype id
// this is used for select room for custommer in check in process
export const fetchAvailableRoom = async (type) => {
  var config = {
    method: "get",
    url: `${SERVER_URL}/api/rooms/skip/0/limit/30?hotelId=${hotelID}`,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: timeOut,
  };

  return await axios(config)
    .then((response) => {
        console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
};

/// fetch all roomtype

export const fetchAllRoomType = async () => {
  return await axios
    .get(`${SERVER_URL}/api/room-types/skip/0/limit/30?hotelId=${hotelID}`, {
      timeout: timeOut,
    })
    .then(async (res) => {
        console.log(res.data)
    })
    .catch((err) => {
      console.error(err);
    });
};
