import { 
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOAD_USER_FAIL,
  LOAD_USER,
} from '../types';

import setAuthToken from '../../utils/setAuthToken';


const initialState = {
  token: localStorage.getItem('token'),
  loading: true,
  userId: null,
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
      setAuthToken(payload.token);
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case LOAD_USER_FAIL:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        name: null,
        token: null,
        userId: null,
        loading: false
      };
    default:
      return state;
  }
}