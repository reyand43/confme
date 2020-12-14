import { auth } from "firebase";
import { db } from "../../services/firebase";
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
        auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          db.ref(`/users/${user.user.uid}/personalData`).push({
            Name: name,
            Surname: surname,
            AccountType: "Участник"
          });
         
          const isLogin = true;
          dispatch(signIn(email, password, isLogin));
        })
        // let url =
        //   "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBz6RaNMraup7lSZBOPuF3aNM5EQJUm_SA";

         //const request = await Axios.post(url, authData);
        
        
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
    // const authData = {
    //   email,
    //   password,
    //   returnSecureToken: true,
    // };

    // let url =
    //   "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBz6RaNMraup7lSZBOPuF3aNM5EQJUm_SA";
    try {
      auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        localStorage.setItem("userId", user.user.uid);
        localStorage.setItem("token", user.user.refreshToken);
        //localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(user.user.refreshToken));
        //dispatch(autoLogout(data.expiresIn));
      })
      // const response = await Axios.post(url, authData);
      // const data = response.data;

      // const expirationDate = new Date(
      //   new Date().getTime() + data.expiresIn * 1000
      // );

     
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
  auth().signOut()
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  
  return {
    type: AUTH_LOGOUT,
  };
}

export function autoLogin() {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    console.log(token)
    // if (!!token === false) {
    //   dispatch(logout());
    // } 
  };
}

export function authSuccess(token) {
  console.log('success')
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
