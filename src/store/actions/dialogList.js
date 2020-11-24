import axios from "../../axios/axios";
import api from "../../helpers/serverApi";
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
  ADD_MESSAGE,
  ADD_DIALOG,
  COUNT_ALL_DIALOGS,
} from "./actionTypes";

export function fetchDialogs(userId) {
  userId = parseInt(userId);
  //загрузка диалогов
  return async (dispatch) => {
    dispatch(fetchDialogsStart());
    try {
      const dialogs = [];
      const res = (await api.fetchDialogs(userId)).data;
      for (const d of res) {
        const friendId =
          userId === d.firstUser_id ? d.secondUser_id : d.firstUser_id;
        const friend = (await api.fetchPersonal(friendId)).data;
        const lastMessage = (await api.fetchMessage(d.lastMessage_id)).data;
        const dialog = {
          id: d.id,
          withName: friend.name,
          withSurname: friend.surname,
          lastMessage: lastMessage.text,
          timestamp: d.updatedAt,
          friendId: friendId,
          sender_id: d.sender_id, //Id пользователя, который последним отправил сообщение
        };
        dialogs.push(dialog);
      }
      dispatch(fetchDialogsSuccess(dialogs));
      api.socket.removeAllListeners("dialogSubscribe");
      api.socket.on("dialogSubscribe", async(res) => {
        const d = res.data;
        console.log("DIALOG_MEsSAGED", userId, d.firstUser_id, d.secondUser_id);
        const friendId =
          userId === parseInt(d.firstUser_id) ? d.secondUser_id : d.firstUser_id;
        const friend = (await api.fetchPersonal(friendId)).data;
        const lastMessage = (await api.fetchMessage(d.lastMessage_id)).data;
        const dialog = {
          id: d.id,
          withName: friend.name,
          withSurname: friend.surname,
          lastMessage: lastMessage.text,
          timestamp: d.updatedAt,
          friendId: friendId,
          sender_id: d.sender_id, //Id пользователя, который последним отправил сообщение
        };
        dispatch({
          type: ADD_DIALOG,
          dialog: dialog
        })
      })
    } catch (e) {
      dispatch(fetchDialogsError(e));
    }
  };
}

export function fetchMessages(userId, dialogId) {
  //загрузка сообщений
  userId = parseInt(userId)

  return async (dispatch) => {
    dispatch(fetchMessagesStart());
    try {
      const messages = []
      const res = (await api.fetchMessages(dialogId)).data;
      for(const message of res) {
        const friend = (await api.fetchPersonal(message.sender_id)).data;
        const m = {
          id: message.sender_id,
          text: message.text,
          name: friend.name,
          surname: friend.surname,
          timestamp: message.createdAt
        }
        messages.push(m);
      }
      dispatch(fetchMessagesSuccess(messages));
      api.socket.removeAllListeners("messageSubscribe");
      api.socket.on("messageSubscribe", async(res) => {
        const message = res.data;
        const friend = (await api.fetchPersonal(message.sender_id)).data;
        const m = {
          id: parseInt(message.sender_id),
          text: message.text,
          dialogId: message.dialogId,
          name: friend.name,
          surname: friend.surname,
          timestamp: message.createdAt
        }
        dispatch({
          type: ADD_MESSAGE,
          message: m
        })
      })
    } catch (e) {
      dispatch(fetchDialogsError(e));
    }
  };
}

export function selectDialog(dialogId, friend) {
  //выбор диалога для загрузки сообщений
  console.log("SELECT_DiALOG", dialogId, friend);
  const userId = parseInt(localStorage.getItem("userId"));
  return async (dispatch) => {
    dispatch(setDialog(dialogId));
    if (dialogId !== null) {
        dispatch(fetchDialogInfo(friend));
    } else dispatch(fetchDialogInfo(null));
    dispatch(fetchMessages(userId, dialogId));
  };
}

export function fetchDialogsCount() {
  return async(dispatch) => {
    const count = (await api.countAllDialogs()).data;
    dispatch({
      type: COUNT_ALL_DIALOGS,
      count
    });
  }
}

export function setDialog(dialogId) {
  return {
    type: SELECT_DIALOG,
    dialogId,
  };
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
      sender_id: userId,
      reciever_id: friendId,
      text: text,
    };
    try {
      await api.sendMessage(postData);
      let content = "";
      dispatch(sendMessagesSuccess(content));
    } catch (error) {
      console.log(error);
      dispatch(sendMessagesError());
    }
  };
}

function formatTime(timestamp) {
  const d = new Date(timestamp);
  const time = `${d.getHours()}:${d.getMinutes()}`;
  return time;
}

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
