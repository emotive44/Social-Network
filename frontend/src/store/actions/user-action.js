import axios from 'axios';

import { setAlert } from '../actions/alert-action';
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


const baseUrl = 'http://localhost:5000/api/v1/';

export const getUser = (userId) => async dispatch => {
  try {
    const res = await axios.get(baseUrl + 'users/' + userId);

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({ type: USER_ERROR });
  }
}

export const getUserFollowing = (userId, search) => async dispatch => {
  try {
    const res = await axios.get(baseUrl + `users/${userId}/following?search=${search}`);

    dispatch({
      type: GET_USER_FOLLOWING,
      payload: res.data
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({ type: USER_ERROR });
  }
}

export const getUserFollowers = (userId) => async dispatch => {
  try {
    const res = await axios.get(baseUrl + `users/${userId}/followers`);

    dispatch({
      type: GET_USER_FOLLOWERS,
      payload: res.data
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({ type: USER_ERROR });
  }
}

export const followUser = (userId, flag) => async dispatch => {
  try {
    const res = await axios.put(baseUrl + `users/${userId}/follow`);
    
    if(flag) {
      dispatch({
        type: FOLLOW_USERS,
        payload: res.data
      });

      return;
    }

    dispatch({
      type: FOLLOW_USER,
      payload: res.data.followers
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({ type: USER_ERROR });
  }
}

export const addPersonalInfo = (personInfo) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    const body = JSON.stringify({ personInfo });
    const res = await axios.put(baseUrl + 'users/info', body, config);

    dispatch({
      type: ADD_PERSONAL_INFO,
      payload: res.data
    });
    
    dispatch(setAlert('You edit your personal info success.', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({ type: USER_ERROR });
  }
}

export const deletePersonalInfo = () => async dispatch => {
  try {
    await axios.delete(baseUrl + 'users/info');

    dispatch({ type: DELETE_PERSONAL_INFO });
    dispatch(setAlert('You delete your personal info seccess.', 'success'));
  } catch (err) {
    dispatch({ type: USER_ERROR });
    dispatch(setAlert(err.response.data.message, 'danger'));
  }
}