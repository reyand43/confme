import { db } from "../../services/firebase";
import {FETCH_TIMETABLE_ERROR, FETCH_TIMETABLE_START, FETCH_TIMETABLE_SUCCESS } from "./actionTypes";

export function fetchTimetable() {  //загрузка диалогов
  return async (dispatch) => {
    dispatch(fetchTimetableStart());
    try {
      db.ref("timetable").on("value", function (snapshot) {
        let days = []
        let timetable = [];
        let streams = [];
        Object.keys(snapshot.val()).forEach((key) => {
          timetable.push(snapshot.val()[key]);
        });
        timetable.map((event) => {
        let date = formatDate(event.startTime)
         !days.includes(date) &&
         days.push(date)
        !streams.includes(event.stream)&&
        streams.push(event.stream)
        })
        days.sort()
        console.log('DAYS', days)
        dispatch(fetchTimetableSuccess(timetable, days, streams));
      });
    } catch (e) {
      dispatch(fetchTimetableError(e));
    }
  };
}

export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const date = `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`;
  return date;
}


export function fetchTimetableSuccess(timetable, days, streams) {
  return {
    type: FETCH_TIMETABLE_SUCCESS,
    timetable,
    days,
    streams
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