import Axios from "axios";
import axios from "../../axios/axios";
import {
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  AUTH_ERROR,
  LOGIN_ERROR,
} from "./actionTypes";

export function signUp(email, password, name, surname) {
  return async (dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    if (name === "" || surname ==="") {
      dispatch(authError());
    } else {
      try {
        let url =
          "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBz6RaNMraup7lSZBOPuF3aNM5EQJUm_SA";

        const request = await Axios.post(url, authData);
        await axios.patch(`/users/${request.data.localId}/personalData.json`, {
          Name: name,
          Surname: surname,
          AccountType: "Участник",
        });
        const isLogin = true;
        dispatch(signIn(email, password, isLogin));
      } catch (e) {
        console.log(e);
        dispatch(authError());
      }
    }
  };
}

//signIn

export function signIn(email, password, isLogin) {
  return async (dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBz6RaNMraup7lSZBOPuF3aNM5EQJUm_SA";
    try {
      const response = await Axios.post(url, authData);
      const data = response.data;

      const expirationDate = new Date(
        new Date().getTime() + data.expiresIn * 1000
      );

      localStorage.setItem("userId", data.localId);
      localStorage.setItem("token", data.idToken);
      localStorage.setItem("expirationDate", expirationDate);
      dispatch(authSuccess(data.idToken));
      dispatch(autoLogout(data.expiresIn));
    } catch (e) {
      console.log(e);
      dispatch(loginError());
    }
  };
}

export function autoLogout(time) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return {
    type: AUTH_LOGOUT,
  };
}

export function autoLogin() {
  return (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));

        dispatch(
          autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token,
  };
}

export function authError() {
  return {
    type: AUTH_ERROR,
  };
}

export function loginError() {
  return {
    type: LOGIN_ERROR,
  };
}
