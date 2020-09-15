import axios from "../../axios/axios";
import {
  FETCH_DIALOGS_SUCCESS, FETCH_DIALOGS_START, FETCH_DIALOGS_ERROR
} from "./actionTypes";

export function fetchDialogs(userId) {
    return async (dispatch) => {
      dispatch(fetchDialogsStart());
      try {
        const response = await axios.get(`/chatList/${userId}.json`);
        console.log('RESPONSE', response)
        
        const dialogs = [];
        Object.keys(response.data).forEach((key) => {
         dialogs.push({
            id: key,
            name: response.data[key].withName,
            surname: response.data[key].withSurname,
            text:  response.data[key].lastMessage,
            time: response.data[key].time,
            userId: response.data[key].userid

          });
        });
        dispatch(fetchDialogsSuccess(dialogs));

      }

     catch (e) {
      dispatch(fetchDialogsError(e));
    }
  };
}

export function fetchDialogsSuccess(dialogs) {
  return {
    type: FETCH_DIALOGS_SUCCESS,
    dialogs,
  };
}


export function fetchDialogsStart() {
  return {
    type: FETCH_DIALOGS_START,
  };
}

export function fetchDialogsError(e) {
  return {
    type: FETCH_DIALOGS_ERROR,
    error: e,
  };
}
