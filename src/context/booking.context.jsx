import * as react from "react";

export const BookingContext = react.createContext();

export const BookingProvider = (props) => {
  const { children } = props;
  const [booking, setbookings] = react.useState([]);
  return (
    <BookingContext.Provider value={{ booking, setbookings }}>
      {children}
    </BookingContext.Provider>
  );
};
