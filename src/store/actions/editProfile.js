import {
  CHANGE_USER_NAME,
  LOAD_USERNAME_FROM_SERVER,
  CLEAR_USER_NAME, CHANGENAME,
  CHANGESURNAME,
  CHANGEAGE,
  CHANGECOMPANY,
  CHANGEPROFESSION,
  CHANGECOUNTRY,
  CHANGECITY,
  CHANGEPHONE,
  CHANGEPURPOSE
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
      const userData = response.data
      dispatch({
        type: LOAD_USERNAME_FROM_SERVER,
        name,
        surname,
        accType,
        userData
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

export function changeValue(name, value){
  return (dispatch) => {
    switch (name) {
      case 'Name':
    dispatch({
      type: CHANGENAME,
      value,
    })
    case 'Surname':
    dispatch({
      type: CHANGESURNAME,
      value
    })
    case 'Age':
    dispatch({
      type: CHANGEAGE,
      value
    })
    case 'Country':
    dispatch({
      type: CHANGECOUNTRY,
      value
    })
    case 'City':
    dispatch({
      type: CHANGECITY,
      value
    })
    case 'Company':
    dispatch({
      type: CHANGECOMPANY,
      value
    })
    case 'Profession':
    dispatch({
      type: CHANGEPROFESSION,
      value
    })
    case 'Phone':
    dispatch({
      type: CHANGEPHONE,
      value
    })
    case 'Purpose':
    dispatch({
      type: CHANGEPURPOSE,
      value
    })
    
  }
}
}