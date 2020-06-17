import { 
  GET_USER,
  USER_ERROR,
} from '../types';

const initialState = {
  loading: true,
  user: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false
      }
    case USER_ERROR:
      return {
        ...state,
        loading: false,
      }
    default: 
      return state;
  }
}