import axios from "../../axios/axios";
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
        const response = await axios.get("/users.json");
        const users = [];
        Object.keys(response.data).forEach((key, index) => {
          users.push(response.data[key].personalData)
          users[index].id = key
        })
        dispatch(fetchUsersSuccess(users));

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
      const response = await axios.get(`/users/${userId}/personalData.json`);
      const user = response.data;
      
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
export function clearState() {
  console.log('clear')
  return {
    type: CLEAR_STATE,
    
  };
}

