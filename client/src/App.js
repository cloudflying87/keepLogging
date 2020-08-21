import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from './pages/Signup';
import Logbook from './pages/Logbook';
import Training from './pages/Training';
import Aircraft from './pages/Aircraft';
import Airports from './pages/Airports';
import MyProfile from './pages/MyProfile';
import './style.css'



function App() {

  return (

    <Router>
      <Switch>
        <Route exact path='/' component={Signup} />
        <Route exact path='/logbook' component={Logbook} />
        <Route exact path='/training' component={Training} />
        <Route exact path='/Aircraft' component={Aircraft} />
        <Route exact path='/Airports' component={Airports} />
        <Route exact path='/myProfile' component={MyProfile} />
      </Switch>
    </Router>

  );
}

export default App;
