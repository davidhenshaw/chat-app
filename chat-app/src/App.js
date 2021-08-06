import './App.css';
import io from "socket.io-client";
import { useEffect } from 'react';

const ENDPOINT = "http://172.25.60.27:4000";

function App() 
{

  useEffect( () => {
    const socket = io(ENDPOINT);

    socket.on("message", message => {
      console.log(message);
    })

  });


  return (
    <div className="App">
      Hello socket world!
    </div>
  );
}

export default App;
