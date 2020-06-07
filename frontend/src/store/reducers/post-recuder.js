import {
  CREATE_POST,
  CREATE_POST_FAIL,
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
    case CREATE_POST_FAIL:
      return {
        ...state,
        loading: false,
      }
    default: 
      return state;
  }
}