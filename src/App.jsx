import { useState, useEffect, useContext } from "react";
import logo from "./logo.svg";
import "./App.css";

import MyRouter from "./routes/index";

import { SERVER_URL } from "./constants";
import { notificationContext } from "./context/notification";

// io
import { io } from "socket.io-client";

function App() {

  return (
    <div>
      <MyRouter />
    </div>
  );
}

export default App;
