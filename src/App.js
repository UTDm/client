import React from 'react';

import ChatRoom from './components/Chat/ChatRoom';
import Join from './components/Join/Join';

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chatroom" component={ChatRoom} />
    </Router>
  );
}

export default App;
