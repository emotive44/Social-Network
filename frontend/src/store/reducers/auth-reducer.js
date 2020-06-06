import { 
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../types';


const initialState = {
  token: localStorage.getItem('token'),
  loading: true,
  userId: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        loading: false,
        token: payload.token,
        userId: payload.userId
      };
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        userId: null,
        loading: false
      };
    default:
      return state;
  }
}