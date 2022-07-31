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
import { BookingProvider } from "./context/booking.context";
import { RegisterProgressProvider } from "./context/registerProgress.context";
import { PrintProvider } from "./context/print.context";

import { CheckInContextProvider } from "./context/checkin.context";
import { EmployeeProvider } from "./context/employee.context";



import "mapbox-gl/dist/mapbox-gl.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CreateCheckInProvider>
      <EmployeeProvider>
      <CheckInContextProvider>
      <PrintProvider>
      <RegisterProgressProvider>
      <BookingProvider>
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
      </BookingProvider>
      </RegisterProgressProvider>
      </PrintProvider>
      </CheckInContextProvider>
      </EmployeeProvider>
    </CreateCheckInProvider>
  </React.StrictMode>
);
