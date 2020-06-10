import {
  CREATE_POST,
  CREATE_POST_FAIL,
  GET_POST_FAIL,
  GET_POST,
  GET_POST_RESET,
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
    case GET_POST_FAIL:
      return {
        ...state,
        post: null,
        loading: false
      }
    case GET_POST_RESET:
      return {
        ...state,
        post: null,
        loading: true
      }
    case CREATE_POST_FAIL:
      return {
        ...state,
        loading: false,
      }
    default: 
      return state;
  }
}