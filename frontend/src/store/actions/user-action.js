import axios from 'axios';

import { setAlert } from '../actions/alert-action';
import { logout } from './auth-action';
import {
  GET_USER,
  USER_ERROR,
  FOLLOW_USER,
  FOLLOW_USERS,
  ADD_PERSONAL_INFO,
  GET_USER_FOLLOWING,
  GET_USER_FOLLOWERS,
  DELETE_PERSONAL_INFO,
} from '../types';

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export const getUser = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(baseUrl + 'users/' + userId);

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({ type: USER_ERROR });
  }
};

export const getUserFollowing = (userId, search) => async (dispatch) => {
  try {
    const res = await axios.get(
      baseUrl + `users/${userId}/following?search=${search}`
    );

    dispatch({
      type: GET_USER_FOLLOWING,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({ type: USER_ERROR });
  }
};

export const getUserFollowers = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(baseUrl + `users/${userId}/followers`);

    dispatch({
      type: GET_USER_FOLLOWERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({ type: USER_ERROR });
  }
};

export const followUser = (userId, flag) => async (dispatch) => {
  try {
    const res = await axios.put(baseUrl + `users/${userId}/follow`);

    if (flag) {
      dispatch({
        type: FOLLOW_USERS,
        payload: res.data,
      });

      return;
    }

    dispatch({
      type: FOLLOW_USER,
      payload: res.data.followers,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({ type: USER_ERROR });
  }
};

export const addPersonalInfo = (personInfo, userId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ personInfo, userId });
    const res = await axios.put(baseUrl + 'users/info', body, config);

    dispatch({
      type: ADD_PERSONAL_INFO,
      payload: res.data,
    });

    dispatch(
      setAlert(
        `You edit ${userId ? 'user' : 'your'} personal info success.`,
        'success'
      )
    );
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({ type: USER_ERROR });
  }
};

export const deletePersonalInfo = (userId) => async (dispatch) => {
  try {
    await axios.delete(baseUrl + 'users/info', { data: { userId } });

    dispatch({ type: DELETE_PERSONAL_INFO });
    dispatch(
      setAlert(
        `You delete ${userId ? 'user' : 'your'} personal info seccess.`,
        'success'
      )
    );
  } catch (err) {
    dispatch({ type: USER_ERROR });
    dispatch(setAlert(err.response.data.message, 'danger'));
  }
};

export const deleteUserProfile = (history, userId) => async (dispatch) => {
  try {
    await axios.delete(baseUrl + 'users/', { data: { userId } });

    userId ? history.push('/users') : dispatch(logout(true));
  } catch (err) {
    dispatch({ type: USER_ERROR });
    dispatch(setAlert(err.response.data.message, 'danger'));
  }
};
