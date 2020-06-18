import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store/store';
import { loadUser } from './store/actions/auth-action';

import setAuthToken from './utils/setAuthToken';

import NavBar from './components/common/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import CreatePost from './components/create-post/CreatePost';
import ProtectedRoute from './components/common/ProtectedRoute';
import Users from './components/users/Users';
import Posts from './components/posts/Posts';
import LandingPage from './components/landing-page/LandingPage';
import NotFoundPage from './components/not-found-page/NotFoundPage';
import Post from './components/post/Post';
import Alert from './components/common/Alert';
import UserProfile from './components/user/UserProfile';


if(localStorage.token) { 
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Alert />
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route exact path='/users' component={Users} />
          <ProtectedRoute path='/users/:userId' component={UserProfile} />
          <ProtectedRoute exact path='/posts' component={Posts} />
          <ProtectedRoute path='/posts/:postId' component={(props) => <Post single {...props}/>} />
          <ProtectedRoute path='/create-post' component={CreatePost} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
