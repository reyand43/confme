import { db } from "../../services/firebase";
import {
  FETCH_TIMETABLE_ERROR,
  FETCH_TIMETABLE_START,
  FETCH_TIMETABLE_SUCCESS,
  ADD_TO_AGENDA_START,
  ADD_TO_AGENDA_ERROR,
  ADD_TO_AGENDA_SUCCESS,
  FETCH_USER_TIMETABLE,
  REMOVE_FROM_AGENDA_START,
  REMOVE_FROM_AGENDA_ERROR,
  REMOVE_FROM_AGENDA_SUCCESS,
} from "./actionTypes";

export function fetchTimetable() {
  //загрузка диалогов
  return async (dispatch) => {
    dispatch(fetchTimetableStart());

    try {
      db.ref("timetable").on("value", function (snapshot) {
        let days = []; //массив дней в расписании
        let timetable = [];
        let streams = [];
        Object.keys(snapshot.val()).forEach((key, index) => {
          timetable.push(snapshot.val()[key]);
          timetable[index].id = key;
        });
        timetable.map((event) => {
          let date = formatDate(event.startTime);
          !days.includes(date) && //если день события еще не упоминался в массиве дней то добавляем
            days.push(date);
          !streams.includes(event.stream) && streams.push(event.stream);
        });
        days.sort();
        dispatch(fetchUserTimetable());
        dispatch(fetchTimetableSuccess(timetable, days, streams));
      });
    } catch (e) {
      dispatch(fetchTimetableError(e));
    }
  };
}

export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const date = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`; //МЕСЯЦА ИДУТ ОТ 0 до 11!!!
  return date;
}

export function fetchTimetableSuccess(timetable, days, streams) {
  return {
    type: FETCH_TIMETABLE_SUCCESS,
    timetable,
    days,
    streams,
  };
}

export function fetchTimetableStart() {
  return {
    type: FETCH_TIMETABLE_START,
  };
}

export function fetchTimetableError(e) {
  return {
    type: FETCH_TIMETABLE_ERROR,
    error: e,
  };
}

export function addToAgenda(event) {
  return (dispatch) => {
    const userId = localStorage.getItem("userId");
    dispatch(addToAgendaStart());
    try {
      db.ref("users/" + userId + "/personalEvents/" + event.id).update({
        event
      });
      // axios.patch(
      //   "users/" + userId + "/personalEvents/" + event.id + ".json",
      //   event
      // );
      dispatch(addToAgendaSuccess());
    } catch (error) {
      dispatch(addToAgendaError(error));
    }
  };
}

export function removeFromAgenda(eventId) {
  return (dispatch) => {
    const userId = localStorage.getItem("userId");
    dispatch(removeFromAgendaStart());
    try {
      db.ref("users/" + userId + "/personalEvents/" + eventId).remove();
      dispatch(removeFromAgendaSuccess());
    } catch (error) {
      dispatch(removeFromAgendaError(error));
    }
  };
}

export function removeFromAgendaSuccess() {
  return {
    type: REMOVE_FROM_AGENDA_SUCCESS,
  };
}

export function removeFromAgendaStart() {
  return {
    type: REMOVE_FROM_AGENDA_START,
  };
}

export function removeFromAgendaError(error) {
  return {
    type: REMOVE_FROM_AGENDA_ERROR,
    error: error,
  };
}

export function addToAgendaSuccess() {
  return {
    type: ADD_TO_AGENDA_SUCCESS,
  };
}

export function addToAgendaStart() {
  return {
    type: ADD_TO_AGENDA_START,
  };
}

export function addToAgendaError(error) {
  return {
    type: ADD_TO_AGENDA_ERROR,
    error: error,
  };
}

export function fetchUserTimetable() {
  return async (dispatch) => {
    try {
      db.ref("users/" + localStorage.getItem("userId") + "/personalEvents").on(
        "value",
        function (snapshot) {
          let userTimetable = []; //массив дней в расписании
          if (snapshot.val() !== null) {
            Object.keys(snapshot.val()).forEach((key, index) => {
              userTimetable.push(snapshot.val()[key].event.id);
            });
            dispatch(fetchUserTimetableSuccess(userTimetable));
          }
          dispatch(fetchUserTimetableSuccess(userTimetable))
        }
      );
    } catch (e) {}
  };
}

function fetchUserTimetableSuccess(userTimetable) {
  return {
    type: FETCH_USER_TIMETABLE,
    userEvents: userTimetable,
  };
}
