import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { CounterProvider } from "./context/counter";

import { RoomTypeProvider } from "./context/roomType.context";
import { DataProvider } from "./context/data.context";
import { RoomProvider } from "./context/room.context";
import { RegisterProvider } from "./context/register.context";
import { CreateCheckInProvider } from "./context/createCheckIn.context";

import { NotificationProvider } from "./context/notification";

import "mapbox-gl/dist/mapbox-gl.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CreateCheckInProvider>
    <NotificationProvider>
      <RegisterProvider>
        <DataProvider>
          <RoomProvider>
            <RoomTypeProvider>
              <CounterProvider>
                <App />
              </CounterProvider>
            </RoomTypeProvider>
          </RoomProvider>
        </DataProvider>
      </RegisterProvider>
    </NotificationProvider>
    </CreateCheckInProvider>
  </React.StrictMode>
);
