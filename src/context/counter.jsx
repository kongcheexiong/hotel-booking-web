import * as react from "react";

export const counterContext = react.createContext(0);

export const CounterProvider = (props) => {
  const { children } = props;
  const [value, setValue] = react.useState({});
  return (
    <counterContext.Provider value={{ value, setValue }}>
      {children}
    </counterContext.Provider>
  );
};
