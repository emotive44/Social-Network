import axios from 'axios';

import {
  LOGOUT,
  LOAD_USER,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  USER_RESET,
  POST_RESET,
} from '../types';

import { setAlert } from './alert-action';


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

    dispatch(setAlert('You are register successfully.', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({ type: AUTH_ERROR });
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

    dispatch(setAlert('You are logged in successfully.', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({ type: AUTH_ERROR });
  }
}

export const logout = (deleteUser) => async dispatch => {
  dispatch({ type: LOGOUT });
  if(deleteUser) {
    dispatch(setAlert('You delete your profile successfully.', 'success'));
  } else {
    dispatch(setAlert('You are logout successfully.', 'success'));
  }
}

export const loadUser = () => async dispatch => {
  try {
    const res = await axios.get(baseUrl + 'users/me');
    dispatch({ 
      type: LOAD_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({ type: AUTH_ERROR });
  }
}