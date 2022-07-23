import * as react from "react";

export const CreateCheckInContext = react.createContext();

export const CreateCheckInProvider = (props) => {
  const { children } = props;
  const [checkInData, setCheckInData] = react.useState({
    
    hotel: "",
    room: "",
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    verify: '',
    checkInDate: "2022/07/12",
    checkOutDate: "2022/07/20",
    isCheckOOut: false,
    note: "",
    reference: ''

  });

  return (
    <CreateCheckInContext.Provider value={{ checkInData, setCheckInData }}>
      {children}
    </CreateCheckInContext.Provider>
  );
};
