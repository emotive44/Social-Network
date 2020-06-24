import { 
  GET_USER,
  USER_ERROR,
  USER_RESET,
  FOLLOW_USER,
  FOLLOW_USERS,
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
    case FOLLOW_USERS:
      return {
        ...state,
        user: localStorage.userId === state.user._id ? {
            ...state.user,
            following: state.user.following.filter(userId => userId !== payload.followedUserId)
          } : state.user,
        following: localStorage.userId === state.user._id ?
          state.following.filter(user => user._id !== payload.followedUserId) :
          state.following.map(user => {
            if(user._id === payload.followedUserId) {
              return {
                ...user,
                followers: payload.followers
              }
            } else return user;
          })
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