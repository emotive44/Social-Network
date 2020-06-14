import { combineReducers } from 'redux';

import auth from './auth-reducer';
import post from './post-recuder';
import alert from './alert-reducer';


export default combineReducers({
  alert,
  auth,
  post
});