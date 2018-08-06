import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS,
} from '../actions/user';

export default function userReducer(state = {
  users: [],
  user: {},
}, action) {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, isFetching: action.isFetching };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        error: true,
        message: action.message,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        users: action.users,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        message: action.message,
      };
    case GET_USER_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        user: { ...action.user },
      };
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        message: action.message,
        error: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: { ...action.user },
        error: false,
      };
    default:
      return state;
  }
}
