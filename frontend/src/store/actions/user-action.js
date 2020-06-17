import axios from 'axios';

import { setAlert } from '../actions/alert-action';
import { 
  GET_USER,
  USER_ERROR,
  FOLLOW_USER,
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

export const followUser = (userId) => async dispatch => {
  try {
    const res = await axios.put(baseUrl + `users/${userId}/follow`);

    dispatch({
      type: FOLLOW_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({ type: USER_ERROR });
  }
}