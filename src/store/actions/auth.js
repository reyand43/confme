import Axios from "axios";
import { AUTH_SUCCESS, AUTH_LOGOUT } from "./actionTypes";

import axios from "../../axios/axios";

export function signUp(email, password) {
  return async (dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBz6RaNMraup7lSZBOPuF3aNM5EQJUm_SA";

    await Axios.post(url, authData);
    const isLogin = true;
    dispatch(signIn(email, password, isLogin));
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
    const response = await Axios.post(url, authData);
    const data = response.data;
    

    const expirationDate = new Date(
      new Date().getTime() + data.expiresIn * 1000
    );

    localStorage.setItem("userId", data.localId)
    console.log('sigin userid', localStorage)
    localStorage.setItem("token", data.idToken);
    localStorage.setItem("expirationDate", expirationDate);
    

    
    dispatch(authSuccess(data.idToken));
    dispatch(fetchNameSurname(data.localId))
    dispatch(autoLogout(data.expiresIn));

  };
}

export function fetchNameSurname(userId) {
  return async (dispatch) => {
    const response = await axios.get(`/users/${userId}/personalData.json`);
    console.log(response)
    try{
    localStorage.setItem('userName', response.data.Name);
    localStorage.setItem('userSurname', response.data.Surname);}
    catch(e){

    }
    console.log('после фетча', localStorage)

  }
  
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
  localStorage.removeItem("userName");
  localStorage.removeItem("userSurname");
  return {
    type: AUTH_LOGOUT,
  };
}

export function autoLogin() {
 

  return (dispatch) => {
    const token = localStorage.getItem("token");

    console.log("storage=", localStorage);

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
        const userId = localStorage.getItem('userId')
        dispatch(fetchNameSurname(userId))
        
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
