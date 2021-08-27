import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {io} from "socket.io-client";
import { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import ChatWindow from './components/ChatWindow';
import SocketProvider from './contexts/SocketProvider';

//export const ENDPOINT = "http://localhost:4000";
export const ENDPOINT = "18.119.6.36";

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
