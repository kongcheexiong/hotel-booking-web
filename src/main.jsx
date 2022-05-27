import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { CounterProvider } from "./context/counter";

import {RoomTypeProvider} from './context/roomType.context'


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RoomTypeProvider>
    <CounterProvider>
      <App />
    </CounterProvider>

    </RoomTypeProvider>

  </React.StrictMode>
);
