import * as react from "react";

export const CreateCheckInContext = react.createContext();

export const CreateCheckInProvider = (props) => {
  const hotel = localStorage.getItem('hotel')
  const { children } = props;
  const [checkInData, setCheckInData] = react.useState({
    hotel: hotel,
    room: "",
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    verify: '',
    checkInDate: Date.now(),
    checkOutDate: "",
    isCheckOut: false,
    note: "",
    reference: '',
    isPaid: false

  });

  return (
    <CreateCheckInContext.Provider value={{ checkInData, setCheckInData }}>
      {children}
    </CreateCheckInContext.Provider>
  );
};
