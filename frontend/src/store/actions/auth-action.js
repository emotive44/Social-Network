import axios from 'axios';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOAD_USER,
  LOAD_USER_FAIL,
} from '../types';


const baseUrl = 'http://localhost:5000/api/v1/';

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

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(baseUrl + 'users/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
}

export const logout = () => async dispatch => {
  dispatch({ type: LOGOUT });
}

export const loadUser = () => async dispatch => {
  try {
    const res = await axios.get(baseUrl + 'users/me');
    dispatch({ 
      type: LOAD_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: LOAD_USER_FAIL});
  }
}