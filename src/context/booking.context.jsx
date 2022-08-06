import * as react from "react";

export const BookingContext = react.createContext();

export const BookingProvider = (props) => {
  const { children } = props;
  const [bookingContext, setbookingContext] = react.useState([]);
  return (
    <BookingContext.Provider value={{ bookingContext, setbookingContext }}>
      {children}
    </BookingContext.Provider>
  );
};
