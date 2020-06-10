import axios from 'axios';

import {
  CREATE_POST,
  CREATE_POST_FAIL,
  GET_POST_FAIL,
  GET_POST
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