import { combineReducers } from 'redux';

import auth from './auth-reducer';
import post from './post-recuder';
import alert from './alert-reducer';
import user from './user-reducer';


export default combineReducers({
  alert,
  auth,
  user,
  post
});