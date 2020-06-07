import { combineReducers } from 'redux';

import auth from './auth-reducer';
import post from './post-recuder';


export default combineReducers({
  auth,
  post
});