import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, BrowserRouter } from "react-router-dom";
import Signup from './pages/Signup';
import Logbook from './pages/Logbook';
import './style.css'


function App() {

  return (
    // <User.Provider value={user}>
      <Router>
        <Switch>
          <Route exact path='/' component={Signup} />
          <Route exact path='/logbook' component={Logbook} />
        </Switch>
      </Router>
    // </User.Provider>

  );
}

export default App;
