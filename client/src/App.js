import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from './components/Nav/index';
import Signup from './pages/Signup';
import './style.css'


function App() {
  return (
    <Router>
        <Nav />
        <Switch>
          <Route exact path='/' component={Signup} />
        </Switch>
    </Router>
  );
}

export default App;
