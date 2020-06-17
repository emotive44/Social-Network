import { 
  GET_USER,
  USER_ERROR,
  FOLLOW_USER,
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
    case FOLLOW_USER:
      return {
        ...state,
        user: { ...state.user, followers: payload }
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