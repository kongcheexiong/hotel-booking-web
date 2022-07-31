import * as react from 'react'



export const roomTypeContext = react.createContext();


export const RoomTypeProvider = (props) => {
    const { children } = props;
    const [roomType, setRoomType] = react.useState([]);
    
    return (
      <roomTypeContext.Provider value={{ roomType, setRoomType }}>
        {children}
      </roomTypeContext.Provider>
    );
  };