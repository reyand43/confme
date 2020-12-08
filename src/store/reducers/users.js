import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_USER_SUCCESS,
  FETCH_USER_START,
  SET_SEARCHED_USERS,
  CLEAR_STATE,
} from "../actions/actionTypes";

const initialState = {
  users: [],
  loading: false,
  error: null,
  user: [],
  userLoading: false,
  searchedUsers: [],
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.users,
        searchedUsers: action.users,
      };
    case FETCH_USER_START:
      return {
        ...state,
        userLoading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        userLoading: false,
        user: action.user,
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SET_SEARCHED_USERS:
      return {
        ...state,
        searchedUsers: action.users,
      };
    case CLEAR_STATE:
      return {
        ...state,
        user: [],
      };
    default:
      return state;
  }
}
