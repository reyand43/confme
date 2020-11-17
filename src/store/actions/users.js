import axios from "../../axios/axios";
import api from "../../helpers/serverApi"
import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_USER_SUCCESS,
  FETCH_USER_START,
  CLEAR_STATE,
  SET_SEARCHED_USERS
} from "./actionTypes";

export function fetchUsers() {
    return async (dispatch) => {
      dispatch(fetchUsersStart());
      try {
        const res = await api.fetchPersonals();
        const personals = res.message;
        dispatch(fetchUsersSuccess(personals));
      }
     catch (e) {
      dispatch(fetchUsersError(e));
    }
  };
}

export function fetchUserById(userId) {
  return async (dispatch) => {
    dispatch(fetchUserStart());
    try {
      const res = await api.fetchPersonal(userId);
      const user = res.message;
      dispatch(fetchUserSuccess(user));
    } catch (e) {
      dispatch(fetchUsersError(e));
    }
  };
}

export function setSearchedUsers(users){
  return{
    type: SET_SEARCHED_USERS,
    users
  }
}

export function fetchUsersSuccess(users) {
  return {
    type: FETCH_USERS_SUCCESS,
    users,
  };
}

export function fetchUserSuccess(user) {
  return {
    type: FETCH_USER_SUCCESS,
    user,
  };
}

export function fetchUsersStart() {
  return {
    type: FETCH_USERS_START,
  };
}

export function fetchUserStart() {
  return {
    type: FETCH_USER_START,
  };
}

export function fetchUsersError(e) {
  return {
    type: FETCH_USERS_ERROR,
    error: e,
  };
}
export function clearState(e) {
  return {
    type: CLEAR_STATE,
    
  };
}

