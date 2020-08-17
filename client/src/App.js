import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from './pages/Signup'


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Signup} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
