import * as react from 'react'


export const EditHotelContext = react.createContext();

export const EditHotelProvider = (props) => {
    const { children } = props;
    const [EditHotel, setEditHotel] = react.useState({});
    
    return (
      <EditHotelContext.Provider value={{ EditHotel, setEditHotel }}>
        {children}
      </EditHotelContext.Provider>
    );
  };