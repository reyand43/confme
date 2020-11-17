import { FETCH_AGENDA_EVENTS_ERROR, FETCH_AGENDA_EVENTS_START, FETCH_AGENDA_EVENTS_SUCCESS } from "../actions/actionTypes";

const initialState = {
    agendaEvents: [],
    loading: false,
    error: null,
}

export default function agendaReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_AGENDA_EVENTS_START:
        return {
          ...state,
          loading: true,
        };
      case FETCH_AGENDA_EVENTS_SUCCESS:
        return {
          ...state,
          loading: false,
          agendaEvents: action.agendaEvents,
        };
        case FETCH_AGENDA_EVENTS_ERROR:
        return {
          ...state,
          loading: false,
          error: action.error
        };      
      default:
        return state;
    }
  }
  