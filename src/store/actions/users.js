import axios from "../../axios/axios";
import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_USER_SUCCESS,
  FETCH_USER_START,
  CLEAR_STATE
} from "./actionTypes";

export function fetchUsers() {
    return async (dispatch) => {
      dispatch(fetchUsersStart());
      try {
        const response = await axios.get("/users.json");
        const users = [];
        Object.keys(response.data).forEach((key) => {
          users.push({
            id: key,
            name: response.data[key].personalData.Name,
            surname: response.data[key].personalData.Surname,
            country: response.data[key].personalData.Country,
            city: response.data[key].personalData.City,
            company: response.data[key].personalData.Company,
            profession: response.data[key].personalData.Profession,
            purpose: response.data[key].personalData.Purpose,
            phone: response.data[key].personalData.Phone,
            age: response.data[key].personalData.Age,
            accountType: response.data[key].personalData.AccountType
          });
        });
        dispatch(fetchUsersSuccess(users));

      }

     catch (e) {
      dispatch(fetchUsersError(e));
    }
  };
}

export function fetchUserById(userId) {
  return async (dispatch) => {
    console.log('fetch started')
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
