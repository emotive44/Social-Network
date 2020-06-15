import {
  GET_POST,
  LIKE_POST,
  POST_ERROR,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  GET_POST_RESET,
  CREATE_COMMENT,
  DELETE_COMMENT,
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
    case UPDATE_POST:
      return {
        ...state,
        loading: false,
        post: { ...state.post, text: payload }
      }
    case DELETE_POST:
      return { 
        ...state,
        post: null,
        loading: false
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
    case CREATE_COMMENT:
      return {
        ...state,
        loading: false,
        post: { ...state.post, comments: [payload, ...state.post.comments]}
      }
    case DELETE_COMMENT:
      return {
        ...state,
        loading: false,
        post: { ...state.post, comments: state.post.comments.filter(comment => comment._id !== payload) }
      }
    case GET_POST_RESET:
      return {
        ...state,
        post: null,
        loading: true
      }
    case POST_ERROR:
      return {
        ...state,
        loading: false,
      }
    default: 
      return state;
  }
}