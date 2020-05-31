import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import NavBar from './components/common/Navbar';
import Register from './components/auth/Register';


const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path='/register' component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
