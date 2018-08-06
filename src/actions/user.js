import axios from 'axios';
import API_PATH from '../utils/constUrls';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';


export const fetchRequest = () => ({
  type: FETCH_USER_REQUEST,
  isFetching: true,
});

export const fetchSuccess = users => ({
  type: FETCH_USER_SUCCESS,
  isFetching: false,
  users,
});

export const fetchFailure = message => ({
  type: FETCH_USER_FAILURE,
  isFetching: false,
  message,
});

export const fetchAll = () => async (dispatcher) => {
  dispatcher(fetchRequest());
  try {
    const response = await axios({
      url: `${API_PATH}/users`,
      method: 'GET',
      responseType: 'json',
    });
    dispatcher(fetchSuccess(response.data));
  } catch (error) {
    dispatcher(fetchFailure(error.message));
  }
};

// edit User
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

const getRequest = () => ({
  isFetching: true,
  type: GET_USER_REQUEST,
});

const getFailure = message => ({
  type: GET_USER_FAILURE,
  isFetching: false,
  message,
});

const getSuccess = user => ({
  type: GET_USER_SUCCESS,
  isFetching: false,
  user,
});

export const getUser = id => async (dispatcher) => {
  dispatcher(getRequest());
  try {
    const url = `${API_PATH}/users/${id}`;
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'json',
    });
    dispatcher(getSuccess(response.data));
  } catch (e) {
    dispatcher(getFailure(e.message));
  }
}

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';

const updateRequest = () => ({
  type: UPDATE_USER_REQUEST,
  isFetching: true,
});

const updateFailure = message => ({
  type: UPDATE_USER_FAILURE,
  isFetching: false,
  message,
});

const updateSuccess = data => ({
  type: UPDATE_USER_SUCCESS,
  isFetching: false,
  user: data,
});

export const updateUser = user => async (dispatcher) => {
  dispatcher(updateRequest());
  const url = `${API_PATH}/users/${user.id}`;
  try {
    const response = await axios({
      url,
      data: user,
      responseType: 'json',
      method: 'PUT',
    });
    dispatcher(updateSuccess(response.data));
  } catch (e) {
    dispatcher(updateFailure(e.message));
  }
}
