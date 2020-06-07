import axios from 'axios';

import {
  CREATE_POST,
  CREATE_POST_FAIL,
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