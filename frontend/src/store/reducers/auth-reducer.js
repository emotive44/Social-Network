import { 
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../types';


const initialState = {
  token: localStorage.getItem('token'),
  loading: true,
  userId: null,
  name: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        loading: false,
      };
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