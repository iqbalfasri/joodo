import axios from 'axios';

import {
  FETCH_TODO_SUCCESS,
  FETCH_TODO_BEGIN,
  FETCH_TODO_ERROR
} from './types'
import {API_URL} from "../../api";

export const getTodos = () => (dispatch) => {
  dispatch({
    type: FETCH_TODO_BEGIN
  })

  axios.get(`${API_URL}`).then((response) => {
    dispatch({type: FETCH_TODO_SUCCESS, payload: response.data})
  }).catch((error) => {
    dispatch({type: FETCH_TODO_ERROR})
    console.error(error, 'axios error')
  })
}