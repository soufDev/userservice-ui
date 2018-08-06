import axios from 'axios';

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
      url: '/api/user',
      method: 'GET',
      responseType: 'json',
    });
    dispatcher(fetchSuccess(response.data));
  } catch (error) {
    dispatcher(fetchFailure(error.message));
    return error.message
  }
};
