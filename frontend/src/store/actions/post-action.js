import axios from 'axios';

import {
  GET_POST,
  LIKE_POST,
  POST_ERROR,
  UPDATE_POST,
  DELETE_POST,
  CREATE_COMMENT,
  DELETE_COMMENT,
  GET_RECENT_POSTS,
  GET_POST_COMMENTS,
  GET_POSTS_BY_USER,
} from '../types';

import { setAlert } from './alert-action';

const baseUrl = 'http://localhost:5000/api/v1/';

export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(baseUrl + 'posts/' + postId);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({ type: POST_ERROR });
  }
};

export const getPosts = (userId, count) => async (dispatch) => {
  try {
    const res = await axios.get(baseUrl + `posts/by/${userId}?count=${count}`);

    dispatch({ type: GET_POSTS_BY_USER, payload: res.data });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({ type: POST_ERROR });
  }
};

export const getRecentPosts = (count) => async (dispatch) => {
  try {
    const res = await axios.get(baseUrl + `posts/recent?count=${count}`);

    dispatch({ type: GET_RECENT_POSTS, payload: res.data });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({ type: POST_ERROR });
  }
};

export const getPostComments = (postId, count) => async (dispatch) => {
  try {
    const res = await axios.get(
      baseUrl + `posts/${postId}/comments?count=${count}`
    );
    dispatch({
      type: GET_POST_COMMENTS,
      payload: res.data.comments,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({ type: POST_ERROR });
  }
};

export const likeUnlikePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(baseUrl + `posts/${postId}/like`);

    dispatch({
      type: LIKE_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({ type: POST_ERROR });
  }
};

export const updatePost = (postId, text) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ text });

  try {
    const res = await axios.put(baseUrl + `posts/${postId}`, body, config);
    dispatch({
      type: UPDATE_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({ type: POST_ERROR });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(baseUrl + `posts/${postId}`);

    dispatch({
      type: DELETE_POST,
      payload: res.data,
    });
    dispatch(setAlert('Delete post successfully.', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({ type: POST_ERROR });
  }
};

export const createComment = (postId, text) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ text });

  try {
    const res = await axios.post(
      baseUrl + `posts/${postId}/comments`,
      body,
      config
    );

    dispatch({
      type: CREATE_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({ type: POST_ERROR });
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(baseUrl + `posts/${postId}/comments/${commentId}`);

    dispatch({ type: DELETE_COMMENT, payload: commentId });
    dispatch(setAlert('Delete comment successfully.', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({ type: POST_ERROR });
  }
};
