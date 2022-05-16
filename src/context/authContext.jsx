import * as react from "react";

export const authInitialValue = {
  data: {
    id: "",
    userName: "",
  },
  accessToken: "",
};

export const authContext = react.createContext(authInitialValue);

export const AuthProvider = (props) => {
  const { children } = props;
  const [auth, setAuth] = react.useState({});
  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};
