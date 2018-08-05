import { FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from '../actions/user';

function userReducer(state = {
  users: [],
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
    default:
      return state;
  }
}

export default userReducer;
