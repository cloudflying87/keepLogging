import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from './pages/Signup';
import Logbook from './pages/Logbook';
import Training from './pages/Training';
import Aircraft from './pages/Aircraft';
import Airports from './pages/Airports';
import MyProfile from './pages/MyProfile';
import Redirect from './pages/Validate';
import './style.css'
import UserContext from './utils/UserContext'



function App() {

  const [user, setUser] = useState({
    userId: '',
    updateUser: function (userId) {
      setUser({
        ...user,
        userId
      })
    }
  })

  
  return (
    <UserContext.Provider value={user}>
      <Router>
        <Switch>
          <Route exact path='/' component={Signup} />
          <Route exact path='/logbook' component={Logbook} />
          <Route exact path='/training' component={Training} />
          <Route exact path='/Aircraft' component={Aircraft} />
          <Route exact path='/Airports' component={Airports} />
          <Route exact path='/myProfile' component={MyProfile} />
          <Route exact path='/redirect/:key/:studentID/:studentEmail' component={Redirect} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
