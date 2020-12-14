import { db } from "../../services/firebase";
import {
  FETCH_DIALOGS_SUCCESS,
  FETCH_DIALOGS_START,
  FETCH_DIALOGS_ERROR,
  FETCH_MESSAGES_ERROR,
  FETCH_MESSAGES_START,
  FETCH_MESSAGES_SUCCESS,
  SELECT_DIALOG,
  FETCH_DIALOG_INFO,
  SEND_MESSAGES_ERROR,
  SEND_MESSAGES_SUCCESS,
  SEND_MESSAGES_START,
  CLEAR_STATE,
} from "./actionTypes";

export function fetchDialogs(userId) {  //загрузка диалогов
  return async (dispatch) => {
    dispatch(fetchDialogsStart());
    try {
      
      db.ref("chatList/" + userId).on("value", function (snapshot) {
        let dialogs = [];
        
        !!snapshot.val() === true &&
          Object.keys(snapshot.val()).forEach((key) => {
            dialogs.push(snapshot.val()[key]);
          });
         dialogs.sort((a, b) => a.timestamp > b.timestamp ? -1 : 1);
        dispatch(fetchDialogsSuccess(dialogs));

      });
    } catch (e) {
      dispatch(fetchDialogsError(e));
    }
  };
}
 
export function fetchMessages(userId, dialogId) { //загрузка сообщений
  return async (dispatch) => {
    dispatch(fetchMessagesStart());
    try {
      
      db.ref("chats/" + userId + "/" + dialogId + "/").on(
        "value",
        (snapshot) => {
          let messages = [];
          snapshot.forEach((snap) => {
            messages.push(snap.val());
          });
          dispatch(fetchMessagesSuccess(messages));
        }
      );
    } catch (e) {
      dispatch(fetchDialogsError(e));
    }
  };
}

export function selectDialog(dialogId) {  //выбор диалога для загрузки сообщений

  return async (dispatch) => {
    let dialogInfo;
    dispatch(setDialog(dialogId))
    if (dialogId!==null){
    try {
      db.ref("users/" + dialogId + "/personalData").on("value", (snapshot) => {
        dialogInfo = snapshot.val();
        dispatch(fetchDialogInfo(dialogInfo));  //загружаем  инфу для отображаения инфы диалога(пока что в users)
      });
    } catch (error) {
      console.log(error);
    }}
    else dispatch(fetchDialogInfo(null))
    dispatch(fetchMessages(localStorage.getItem("userId"), dialogId));
  };
}

export function setDialog(dialogId){
  return{
    type: SELECT_DIALOG,
    dialogId
  }
}

export function fetchDialogInfo(dialogInfo) {
  return {
    type: FETCH_DIALOG_INFO,
    dialogInfo,
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

export function fetchMessagesSuccess(messages) {
  return {
    type: FETCH_MESSAGES_SUCCESS,
    messages,
  };
}

export function fetchMessagesStart() {
  return {
    type: FETCH_MESSAGES_START,
  };
}

export function fetchMessagesError(e) {
  return {
    type: FETCH_MESSAGES_ERROR,
    error: e,
  };
}

export function sendMessages(
  userId,
  text,
  friendId,
  name,
  surname,
  withName,
  withSurname,
  withId
) {
  return async (dispatch) => {
    dispatch(sendMessagesStart());
    const postData = {
      userid: userId,
      lastMessage: text,
      timestamp: Date.now(),
      withName: withName,
      withSurname: withSurname,
      withId: withId,
    };

    try {
      await db.ref("chats/" + userId + "/" + friendId + "/").push({
        content: text,
        timestamp: Date.now(),
        uid: userId,
        name,
        surname,
      });
      await db.ref("chats/" + friendId + "/" + userId + "/").push({
        content: text,
        timestamp: Date.now(),
        uid: userId,
        name,
        surname,
      });
      await db.ref(`/chatList/${userId}/${friendId}/`).push({
        postData
      });
      postData.withName = name;
      postData.withSurname = surname;
      postData.withId = userId;
      await db.ref(`/chatList/${friendId}/${userId}/`).push({
        postData
      });
      
      let content = "";
      dispatch(sendMessagesSuccess(content));
    } catch (error) {
      console.log(error);
      dispatch(sendMessagesError());
    }
  };
}

// function formatTime(timestamp) {
//   const d = new Date(timestamp);
//   const time = `${d.getHours()}:${d.getMinutes()}`;
//   return time;
// }

export function sendMessagesSuccess(content) {
  return {
    type: SEND_MESSAGES_SUCCESS,
    content,
  };
}

export function sendMessagesStart() {
  return {
    type: SEND_MESSAGES_START,
  };
}
export function sendMessagesError(e) {
  return {
    type: SEND_MESSAGES_ERROR,
    error: e,
  };
}

export function clearState() {
  return {
    type: CLEAR_STATE,
  };
}

