import * as react from 'react'

const initialState =  {
    id: "",
    data: {
      typeName: "",
      price: '',
      numberOfBed: '',
      suggestedGuestAllowed: '',
      note: '',
      images: []
    }
  }


export const dataContext = react.createContext();


export const DataProvider = (props) => {
    const { children } = props;
    const [data, setData] = react.useState({});
    
    return (
      <dataContext.Provider value={{ data, setData }}>
        {children}
      </dataContext.Provider>
    );
  };