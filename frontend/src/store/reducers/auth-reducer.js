import { 
  LOGOUT,
  LOAD_USER,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
} from '../types';

import setAuthToken from '../../utils/setAuthToken';


const initialState = {
  token: localStorage.getItem('token'),
  loading: true,
  userId: null,
  avatar: null,
  name: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case LOAD_USER:
      return {
        ...state,
        ...payload,
        loading: false
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      localStorage.setItem('userId', payload.userId);
      setAuthToken(payload.token);
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        name: null,
        token: null,
        userId: null,
        avatar: null,
        loading: false
      };
    default:
      return state;
  }
}