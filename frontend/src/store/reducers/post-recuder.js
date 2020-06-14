import {
  CREATE_POST,
  CREATE_POST_FAIL,
  GET_POST_FAIL,
  GET_POST,
  GET_POST_RESET,
  LIKE_POST_FAIL,
  LIKE_POST,
} from '../types';


const initialState = {
  loading: true,
  post: null,
  posts: [],
};

export default function (state = initialState , action) {
  const { type, payload } = action;

  switch(type) {
    case CREATE_POST:
      return {
        ...state,
        loading: false,
        posts: [payload, ...state.posts]
      }
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      }
    case LIKE_POST:
      return {
        ...state,
        loading: false,
        post: { ...state.post, likes: payload }
      }
    case GET_POST_RESET:
      return {
        ...state,
        post: null,
        loading: true
      }
    case GET_POST_FAIL:
    case LIKE_POST_FAIL:
    case CREATE_POST_FAIL:
      return {
        ...state,
        loading: false,
      }
    default: 
      return state;
  }
}