import axios from "../../axios/axios";
import { db } from "../../services/firebase";
import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_USER_SUCCESS,
  FETCH_USER_START,
  CLEAR_STATE,
  SET_SEARCHED_USERS,
} from "./actionTypes";

export function fetchUsers() {
  return async (dispatch) => {
    dispatch(fetchUsersStart());
    try {
      db.ref("users/").on("value", (snapshot) => {
        let users = [];
          Object.keys(snapshot.val()).forEach((key, index) => {
            users.push(snapshot.val()[key].personalData);
            users[index].id = key;
          });
          dispatch(fetchUsersSuccess(users));
        });
    } catch (e) {
      dispatch(fetchUsersError(e));
    }
  };
}

export function fetchUserById(userId) {
  return async (dispatch) => {
    dispatch(fetchUserStart());
    try {
      db.ref(`/users/${userId}/personalData`).on("value", (snapshot) => {
        let user = snapshot.val();
        dispatch(fetchUserSuccess(user));
      });
    } catch (e) {
      dispatch(fetchUsersError(e));
    }
  };
}

export function setSearchedUsers(users) {
  return {
    type: SET_SEARCHED_USERS,
    users,
  };
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
export function clearState() {
  return {
    type: CLEAR_STATE,
  };
}
