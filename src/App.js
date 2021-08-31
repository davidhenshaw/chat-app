import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {io} from "socket.io-client";
import { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import ChatWindow from './components/ChatWindow';
import SocketProvider from './contexts/SocketProvider';

//export const ENDPOINT = "https://localhost:4000";
export const ENDPOINT = "https://chat.davidhenshaw.net";

function App() 
{
  return (
    <div className="App">
      <SocketProvider>
        <ChatWindow />
      </SocketProvider>
    </div>
  );
}

export default App;
