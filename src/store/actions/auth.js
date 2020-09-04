import React from 'react'
import Axios from "axios";
import { AUTH_SUCCESS, AUTH_LOGOUT } from "./actionTypes";
import {Redirect} from 'react-router-dom'
import {createBrowserHistory} from 'history'

export function auth(email, password, isLogin) {
  return async (dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url =
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBz6RaNMraup7lSZBOPuF3aNM5EQJUm_SA';

    if (isLogin) {
      url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBz6RaNMraup7lSZBOPuF3aNM5EQJUm_SA';
    }

    const response = await Axios.post(url, authData);
    const data = response.data;

    const expirationDate = new Date(
      new Date().getTime() + data.expiresIn * 1000
    );

    localStorage.setItem("token", data.idToken);
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("expirationDate", expirationDate);

    console.log('isLogin', isLogin)

    


    dispatch(authSuccess(data.idToken));
    dispatch(autoLogout(data.expiresIn));
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
  console.log('autoLogin')
  
  return dispatch => {
    const token = localStorage.getItem('token')
    console.log('storage=', localStorage)
    
    if(!token) {
      dispatch(logout())
    }else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if(expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token));

        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
       
      }
    }
  }
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token,
  };
}