import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store/store';

import NavBar from './components/common/Navbar';
import Register from './components/auth/Register';


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Switch>
          <Route path='/register' component={Register} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
