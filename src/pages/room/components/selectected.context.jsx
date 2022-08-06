import * as react from 'react'

export const EmployeeContext = react.createContext();

export const EmployeeProvider = (props) => {
    const { children } = props;
    const [Employee, setEmployee] = react.useState([]);
    
    return (
      <EmployeeContext.Provider value={{ Employee, setEmployee }}>
        {children}
      </EmployeeContext.Provider>
    );
  };