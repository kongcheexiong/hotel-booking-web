import * as react from 'react'

export const notificationContext = react.createContext();

export const NotificationProvider = (props) => {
    const { children } = props;
    const [notification, setNotification] = react.useState(0);
    
    return (
      <notificationContext.Provider value={{ notification, setNotification }}>
        {children}
      </notificationContext.Provider>
    );
  };