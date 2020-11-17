import { db } from "../../services/firebase";
import {
  FETCH_AGENDA_EVENTS_ERROR,
  FETCH_AGENDA_EVENTS_START,
  FETCH_AGENDA_EVENTS_SUCCESS,
} from "./actionTypes";

export function fetchAgendaEvents(userId) {
  return async (dispatch) => {
    dispatch(fetchAgendaEventsStart());
    try {
      db.ref("/users/" + userId + "/personalEvents").on("value", function (
        snapshot
      ) {
        let agendaEvents = [];
        if (snapshot.val() !== null) {
          Object.keys(snapshot.val()).forEach((key) => {
            agendaEvents.push(snapshot.val()[key]);
          });
          console.log(agendaEvents);
          dispatch(fetchAgendaEventsSuccess(agendaEvents));
        }
      });
    } catch (error) {
      dispatch(fetchAgendaEventsError(error));
    }
  };
}

export function fetchAgendaEventsStart() {
  return {
    type: FETCH_AGENDA_EVENTS_START,
  };
}

export function fetchAgendaEventsSuccess(agendaEvents) {
  return {
    type: FETCH_AGENDA_EVENTS_SUCCESS,
    agendaEvents,
  };
}

export function fetchAgendaEventsError(error) {
  return {
    type: FETCH_AGENDA_EVENTS_ERROR,
    error,
  };
}
