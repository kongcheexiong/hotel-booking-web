import * as react from 'react'

export const PrintContext = react.createContext();

export const PrintProvider = (props) => {
    const { children } = props;
    const [Print, setPrint] = react.useState([]);
    
    return (
      <PrintContext.Provider value={{ Print, setPrint }}>
        {children}
      </PrintContext.Provider>
    );
  };