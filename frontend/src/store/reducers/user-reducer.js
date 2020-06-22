import { 
  GET_USER,
  USER_ERROR,
  USER_RESET,
  FOLLOW_USER,
  ADD_PERSONAL_INFO,
  GET_USER_FOLLOWING,
  DELETE_PERSONAL_INFO,
} from '../types';

const initialState = {
  user: {},
  loading: true,
  following: [],
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
    case GET_USER_FOLLOWING:
      return {
        ...state,
        following: payload
      }
    case ADD_PERSONAL_INFO:
      return {
        ...state,
        user: { ...state.user, personalInfo: payload }
      }
    case DELETE_PERSONAL_INFO:
      return {
        ...state,
        user: { ...state.user, personalInfo: {} }
      }
    case FOLLOW_USER:
      return {
        ...state,
        user: { ...state.user, followers: payload }
      }
    case USER_RESET:
      return {
        user: {},
        loading: true,
        following: [],
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