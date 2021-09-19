import { io } from "socket.io-client";
import { useState, useContext, useEffect, createContext } from 'react';
import { ENDPOINT } from '../App';
import { useAuth } from "./AuthProvider";

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState();
  const authData = useAuth();

  useEffect(() => {
    const newSocket = io(ENDPOINT, {auth: authData});
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}
