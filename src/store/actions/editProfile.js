import {
  FETCH_USER_DATA_START,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_ERROR,
  SEND_USER_DATA_ERROR,
  SEND_USER_DATA_START,
  SEND_USER_DATA_SUCCESS_SHOW,
  SEND_USER_DATA_SUCCESS_HIDE
} from "./actionTypes";
import axios from "../../axios/axios";
import { db } from "../../services/firebase";


//export function loadUserNameFromServer() {  //Загружаем имя с сервера
export function fetchUserData(){
  return async (dispatch) => {
    dispatch(fetchUserDataStart())
    const userId = localStorage.getItem("userId");
    try {
      db.ref(`/users/${userId}/personalData`).on("value", (snapshot) => {
        let userData = snapshot.val();
        dispatch(fetchUserDataSuccess(userData)) //загружаем  инфу для отображаения инфы диалога(пока что в users)
      });
    } catch (e) {
      console.log(e);
      dispatch(fetchUserDataError(e))
    }
  };
}

function fetchUserDataSuccess(userData) {
  return {
    type: FETCH_USER_DATA_SUCCESS,
    userData,
  };
}

function fetchUserDataStart() {
  return {
    type: FETCH_USER_DATA_START,
  };
}

function fetchUserDataError(e) {
  return {
    type: FETCH_USER_DATA_ERROR,
    error: e,
  };
}


export function sendUserData(Info){
  return async (dispatch) => {
    dispatch(sendUserDataStart())
    const userId = localStorage.getItem("userId");
    try {
      await axios.patch(`/users/${userId}/personalData.json`, Info);
      dispatch(sendUserDataSuccess())
    } catch (error) {
      console.log(error)
      dispatch(sendUserDataError(error))
    }
  }
}

function sendUserDataSuccess() {
  return (dispatch) => {
    dispatch(sendUserDataSuccessShow())
    setTimeout(() => {
      dispatch(sendUserDataSuccessHide())
    }, 2000);
  }
}

function sendUserDataSuccessShow() {
  return {
    type: SEND_USER_DATA_SUCCESS_SHOW,
  };
}

function sendUserDataSuccessHide() {
  return {
    type: SEND_USER_DATA_SUCCESS_HIDE,
  };
}


function sendUserDataStart() {
  return {
    type: SEND_USER_DATA_START,
  };
}

function sendUserDataError(e) {
  return {
    type: SEND_USER_DATA_ERROR,
    error: e,
  };
}