import {
  GET_POST,
  LIKE_POST,
  POST_ERROR,
  POST_RESET,
  UPDATE_POST,
  DELETE_POST,
  CREATE_COMMENT,
  DELETE_COMMENT,
  GET_RECENT_POSTS,
  GET_POST_COMMENTS,
  GET_POSTS_BY_USER,
} from '../types';

const initialState = {
  loading: true,
  post: null,
  posts: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_POST:
      return {
        ...state,
        loading: false,
        post: { ...state.post, text: payload.text },
        posts: state.posts.map((post) => {
          if (post._id === payload.postId) {
            post.text = payload.text;
            return post;
          } else return post;
        }),
      };
    case DELETE_POST:
      return {
        ...state,
        post: null,
        loading: false,
        posts: state.posts.filter((post) => post._id !== payload),
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case GET_RECENT_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POSTS_BY_USER:
      return {
        ...state,
        posts: payload,
      };
    case GET_POST_COMMENTS:
      return {
        ...state,
        loading: false,
        post: { ...state.post, currComments: [...payload] },
      };
    case LIKE_POST:
      return {
        ...state,
        loading: false,
        post: { ...state.post, likes: payload.likes },
        posts: state.posts.map((post) => {
          if (post._id === payload.postId) {
            post.likes = payload.likes;
            return post;
          } else return post;
        }),
      };
    case CREATE_COMMENT:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          comments: state.post.comments + 1,
          currComments: [payload, ...state.post.currComments],
        },
      };
    case DELETE_COMMENT:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          comments: state.post.comments - 1,
          currComments: state.post.currComments.filter(
            (comment) => comment._id !== payload
          ),
        },
      };
    case POST_RESET:
      return {
        posts: [],
        post: null,
        loading: true,
      };
    case POST_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
