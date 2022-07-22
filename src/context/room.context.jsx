import * as react from 'react'


export const roomContext = react.createContext();


export const RoomProvider = (props) => {
    const { children } = props;
    const [room, setRoom] = react.useState({
      roomData: []
    });
    
    return (
      <roomContext.Provider value={{ room, setRoom }}>
        {children}
      </roomContext.Provider>
    );
  };