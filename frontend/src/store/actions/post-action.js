import axios from 'axios';

import {
  CREATE_POST,
  CREATE_POST_FAIL,
  GET_POST_FAIL,
  GET_POST,
  LIKE_POST,
  LIKE_POST_FAIL,
  UPDATE_POST_FAIL,
  UPDATE_POST,
  DELETE_POST,
  DELETE_POST_FAIL,
} from '../types';


const baseUrl = 'http://localhost:5000/api/v1/';

export const createPost = (text, image) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ text, image });

  try {
    const res = await axios.post(baseUrl + 'posts', body, config);

    dispatch({
      type: CREATE_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: CREATE_POST_FAIL });
    console.log(err.response.data.message)
  }
}

export const getPost = (postId) => async dispatch => {
  try {
    const res = await axios.get(baseUrl + 'posts/' + postId);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: GET_POST_FAIL });
    console.log(err.response.data.message)
  }
}

export const likeUnlikePost = (postId) => async dispatch => {
  try {
    const res = await axios.put(baseUrl + `posts/${postId}/like`);

    dispatch({
      type: LIKE_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: LIKE_POST_FAIL });
  }
}

export const updatePost = (postId, text) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ text });

  try {
    const res = await axios.put(baseUrl + `posts/${postId}`, body, config);
    dispatch({
      type: UPDATE_POST,
      payload: res.data
    });
  } catch (err) {
    console.log(err)
    dispatch({ type: UPDATE_POST_FAIL })
  }
}

export const deletePost = (postId) => async dispatch => {
  try {
    await axios.delete(baseUrl + `posts/${postId}`);

    dispatch({ type: DELETE_POST });
  } catch (err) {
    dispatch({ type: DELETE_POST_FAIL });
  }
}