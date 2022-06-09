import * as react from "react";

export const registerContext = react.createContext();

export const RegisterProvider = (props) => {
  const { children } = props;
  const [registerInfo, setRegisterInfo] = react.useState({});

  return (
    <registerContext.Provider value={{ registerInfo, setRegisterInfo }}>
      {children}
    </registerContext.Provider>
  );
};
