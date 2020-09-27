import {
  CHANGE_USER_NAME,
  LOAD_USERNAME_FROM_SERVER,
  CLEAR_USER_NAME,
} from "./actionTypes";
import axios from "../../axios/axios";

export function updateUserName(name, surname) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_USER_NAME,
      name,
      surname,
    });
  };
}

export function loadUserNameFromServer() {
  return async (dispatch) => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.get(`/users/${userId}/personalData.json`);
      const name = response.data.Name;
      const surname = response.data.Surname;
      const accType = response.data.AccountType;
      dispatch({
        type: LOAD_USERNAME_FROM_SERVER,
        name,
        surname,
        accType,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function clearUserName() {
  return (dispatch) => {
    dispatch({
      type: CLEAR_USER_NAME,
    });
  };
}
