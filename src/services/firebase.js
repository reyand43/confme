import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBz6RaNMraup7lSZBOPuF3aNM5EQJUm_SA",
    authDomain: "confme-5e80c.firebaseapp.com",
    databaseURL: "https://confme-5e80c.firebaseio.com",
    projectId: "confme-5e80c",
    storageBucket: "confme-5e80c.appspot.com",
    messagingSenderId: "869278312853",
    appId: "1:869278312853:web:8ae98e30e357610fbcae9c",
    measurementId: "G-X55KN3BN8V"
  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth;
  export const db = firebase.database();