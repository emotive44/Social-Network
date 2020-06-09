import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store/store';

import setAuthToken from './utils/setAuthToken';

import NavBar from './components/common/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import CreatePost from './components/create-post/CreatePost';
import ProtectedRoute from './components/common/ProtectedRoute';
import Users from './components/users/Users';
import Posts from './components/posts/Posts';
import LandingPage from './components/landing-page/LandingPage';


if(localStorage.token) { 
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/users' component={Users} />
          <Route path='/posts' component={Posts} />
          <ProtectedRoute path='/create-post' component={CreatePost} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
