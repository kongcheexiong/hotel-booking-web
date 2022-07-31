import * as react from 'react'

export const CheckInContextContext = react.createContext();

export const CheckInContextProvider = (props) => {
    const { children } = props;
    const [CheckInContext, setCheckInContext] = react.useState([]);
    
    return (
      <CheckInContextContext.Provider value={{ CheckInContext, setCheckInContext }}>
        {children}
      </CheckInContextContext.Provider>
    );
  };