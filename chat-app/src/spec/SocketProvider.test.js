import { render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";

import SocketProvider, {useSocket} from '../contexts/SocketProvider';

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