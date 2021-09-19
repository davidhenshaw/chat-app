import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import ChatContainer from './containers/ChatContainer';
import Signup from './Signup';

// export const ENDPOINT = "http://localhost:8080";
export const ENDPOINT = "https://chat.davidhenshaw.net";

function App() 
{
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <ChatContainer /> 
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
