import { db } from "../../services/firebase";
import {
  FETCH_WEBINAR_MESSAGES_ERROR,
  FETCH_WEBINAR_MESSAGES_START,
  FETCH_WEBINAR_MESSAGES_SUCCESS,
  FETCH_WEBINAR_INFO_ERROR,
  FETCH_WEBINAR_INFO_START,
  FETCH_WEBINAR_INFO_SUCCESS,
  SEND_WEBINAR_MESSAGE_ERROR,
  SEND_WEBINAR_MESSAGE_START,
  SEND_WEBINAR_MESSAGE_SUCCESS,
} from "./actionTypes";

export function fetchWebinarMessages(webinarId) {
  //загрузка сообщений
  return async (dispatch) => {
    dispatch(fetchWebinarMessagesStart());
    try {
      db.ref("timetable/" + webinarId + "/messages/").on(
        "value",
        (snapshot) => {
          let messages = [];
          snapshot.forEach((snap) => {
            messages.push(snap.val());
          });
          dispatch(fetchWebinarMessagesSuccess(messages));
        }
      );
    } catch (e) {
      dispatch(fetchWebinarMessagesError(e));
    }
  };
}

export function fetchWebinarMessagesSuccess(messages) {
  return {
    type: FETCH_WEBINAR_MESSAGES_SUCCESS,
    messages,
  };
}

export function fetchWebinarMessagesStart() {
  return {
    type: FETCH_WEBINAR_MESSAGES_START,
  };
}

export function fetchWebinarMessagesError(e) {
  return {
    type: FETCH_WEBINAR_MESSAGES_ERROR,
    error: e,
  };
}

export function sendWebinarMessage(userId, content, name, surname, webinarId) {
  //загрузка сообщений
  return async (dispatch) => {
    dispatch(sendWebinarMessageStart());
    try {
      await db.ref("timetable/" + webinarId + "/messages/").push({
        UserId: userId,
        Content: content,
        Timestamp: Date.now(),
        Name: name,
        Surname: surname,
      });
      dispatch(sendWebinarMessageSuccess());
    } catch (e) {
      dispatch(sendWebinarMessageError(e));
    }
  };
}

export function sendWebinarMessageSuccess() {
  return {
    type: SEND_WEBINAR_MESSAGE_SUCCESS,
  };
}

export function sendWebinarMessageStart() {
  return {
    type: SEND_WEBINAR_MESSAGE_START,
  };
}

export function sendWebinarMessageError(e) {
  return {
    type: SEND_WEBINAR_MESSAGE_ERROR,
    error: e,
  };
}

export function fetchWebinarInfo(webinarId) {
  //загрузка сообщений
  return async (dispatch) => {
    dispatch(fetchWebinarInfoStart());
    try {
      db.ref("timetable/" + webinarId).on("value", (snapshot) => {
        const webinarInfo = snapshot.val();
        dispatch(fetchWebinarInfoSuccess(webinarInfo));
      });
    } catch (e) {
      dispatch(fetchWebinarInfoError(e));
    }
  };
}

export function fetchWebinarInfoSuccess(webinarInfo) {
  return {
    type: FETCH_WEBINAR_INFO_SUCCESS,
    webinarInfo,
  };
}

export function fetchWebinarInfoStart() {
  return {
    type: FETCH_WEBINAR_INFO_START,
  };
}

export function fetchWebinarInfoError(e) {
  return {
    type: FETCH_WEBINAR_INFO_ERROR,
    error: e,
  };
}
