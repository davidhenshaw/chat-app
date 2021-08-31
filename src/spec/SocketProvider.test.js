import { render, screen } from "@testing-library/react";
import { useEffect, useState } from "react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";

import SocketProvider, {useSocket} from '../contexts/SocketProvider';
import {ENDPOINT} from './../App.js';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("useSocket provides a socket", () => {

  function SocketUser()
  {
    let socket = useSocket();

    return <> {socket ? "socket found" : "socket not found"} </>;
  }

  let user = <SocketUser/>

  render(<SocketProvider> {user} </SocketProvider>, container);
  
  expect(screen.getByText("socket found")).not.toBeNull();

})

test("socket can ping server", async (done) => {

  function SocketUser(props)
  {
    let socket = useSocket();
    const [state, setState] = useState(null);

    useEffect( ()=> {
      socket.on('message', props.onPong);
      socket.emit('ping');
    })

    return <> {state ? "success" : "failure"} </>;
  }

  const onPong = (message) => {
    try{
      expect(screen.getByText("success")).not.toBeNull();
      done();
    }
    catch(error)
    {
      done(error);
    }
  }

  let user = <SocketUser onPong={onPong}/>

  render(<SocketProvider> {user} </SocketProvider>, container);
  setTimeout(()=> done(), 2000);
  
})