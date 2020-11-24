import api from "../../helpers/serverApi";
import {
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  AUTH_ERROR,
  LOGIN_ERROR,
} from "./actionTypes";

export function signUp(email, password, name, surname) {
  return async (dispatch) => {
    const authData = {
      email, password, name, surname
    };
    if (name === "" || surname ==="") {
      dispatch(authError());
    } else {
      const res = await api.signUp(authData);
      if(res.status === 'error') dispatch(authError());
      else{
        dispatch(signIn(email, password));
      }
    }
  };
}

export function signIn(email, password) {
  return async (dispatch) => {
    const authData = {
      email,
      password,
    };

    const res = await api.signIn(authData);
    if(res.status === 'error') dispatch(loginError());
    else {
      const data = res.data;
      localStorage.setItem("userId", data.id);
      localStorage.setItem('token', data.accessToken);
      dispatch(authSuccess(data.accessToken));
    }
  }
}

export function logout() {
  return async(dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    const res = await api.socket.emit("signOut", {})
    dispatch ({
      type: AUTH_LOGOUT,
    });
  }
}

export function autoLogin() {
  return (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(logout());
    } else {
        dispatch(authSuccess(token));
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
