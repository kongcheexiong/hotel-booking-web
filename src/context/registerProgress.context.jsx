import * as react from "react";

export const RegisterProgressContext = react.createContext();

export const RegisterProgressProvider = (props) => {
  const { children } = props;
  const [RegisterProgress, setRegisterProgress] = react.useState(0);

  return (
    <RegisterProgressContext.Provider value={{ RegisterProgress, setRegisterProgress }}>
      {children}
    </RegisterProgressContext.Provider>
  );
};
