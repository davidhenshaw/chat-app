import './App.css';
import {io} from "socket.io-client";
import { useEffect } from 'react';

const socket = io("http://localhost:4000");

function App() 
{

  useEffect( () => {
    socket.on('message', (msg) => {
      console.log(msg);
    })
  })

  return (
    <div className="App">
      Hello socket world!
    </div>
  );
}

export default App;
