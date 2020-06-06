import axios from 'axios';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../types';


const baseUrl = 'http://localhost:5000/api/v1/'

export const registerUser = (name, email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post(baseUrl + 'users/register', body, config);

    dispatch({ 
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: REGISTER_FAIL});
  }
}