import axios from "../../axios/axios";
import { db } from "../../services/firebase";
import {FETCH_TIMETABLE_ERROR, FETCH_TIMETABLE_START, FETCH_TIMETABLE_SUCCESS, ADD_TO_AGENDA_START, ADD_TO_AGENDA_ERROR, ADD_TO_AGENDA_SUCCESS } from "./actionTypes";

export function fetchTimetable() {  //загрузка диалогов
  return async (dispatch) => {
    dispatch(fetchTimetableStart());
    try {
      db.ref("timetable").on("value", function (snapshot) {
        let days = []
        let timetable = [];
        let streams = [];
        Object.keys(snapshot.val()).forEach((key, index) => {
          timetable.push(snapshot.val()[key]);
          timetable[index].id = key
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

export function addToAgenda(event){
  return (dispatch=>{
    const userId = localStorage.getItem('userId')
    dispatch(addToAgendaStart())
    try{
      axios.post("users/" + userId + "/personalEvents.json", event);
      console.log('success')
      dispatch(addToAgendaSuccess())
    }
    catch(error){
      console.log('error')
      dispatch(addToAgendaError(error))
    }
  })
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
