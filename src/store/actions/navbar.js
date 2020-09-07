import axios from "../../axios/axios";
import firebase from 'firebase'
import {FETCH_DATA_ERROR, FETCH_DATA_SUCCESS, FETCH_DATA_START} from './actionTypes'

export function fetchData(){
    return async (dispatch) => {
        

        dispatch(fetchDataStart());
        try {
            const userId = localStorage.getItem("userId")
            const response =  await axios.get(`/users/${userId}/PersonalData.json`);
            const name = response.data.Name
            const surname = response.data.Surname
            localStorage.setItem('name', name)
            localStorage.setItem('surname', surname)
            console.log('name', name, 'surname', surname)
           
            dispatch(fetchDataSuccess(name, surname))
        }
        catch(e){
            dispatch(fetchDataError(e))
        }
    }
}

export function fetchDataStart() {
    return {
      type: FETCH_DATA_START,
    };
  }
  
  export function fetchDataSuccess(name, surname) {
    return {
      type: FETCH_DATA_SUCCESS,
      name,
      surname
    };
  }

  export function fetchDataError(e) {
    return {
      type: FETCH_DATA_ERROR,
      error: e,
    };
  }