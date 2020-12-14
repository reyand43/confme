import {
  ADD_TO_AGENDA_ERROR,
  ADD_TO_AGENDA_START,
  ADD_TO_AGENDA_SUCCESS,
  FETCH_TIMETABLE_ERROR,
  FETCH_TIMETABLE_START,
  FETCH_TIMETABLE_SUCCESS,
  FETCH_USER_TIMETABLE,
  REMOVE_FROM_AGENDA_ERROR,
  REMOVE_FROM_AGENDA_START,
  REMOVE_FROM_AGENDA_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  timetable: [],
  error: null,
  loading: false,
  days: [],
  streams: [],
  userTimetable: [],
  addLoading: false,
  removeLoading: false
};

export default function timetableReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TIMETABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        timetable: action.timetable,
        days: action.days,
        streams: action.streams,
      };
    case FETCH_TIMETABLE_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TIMETABLE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ADD_TO_AGENDA_SUCCESS:
      return {
        ...state,
        addLoading: false,
      };
    case ADD_TO_AGENDA_START:
      return {
        ...state,
        addLoading: true,
      };
    case ADD_TO_AGENDA_ERROR:
      return {
        ...state,
        addLoading: false,
        addError: action.error,
      };
      case REMOVE_FROM_AGENDA_SUCCESS:
        return {
          ...state,
          removeLoading: false,
        };
      case REMOVE_FROM_AGENDA_START:
        return {
          ...state,
          removeLoading: true,
        };
      case REMOVE_FROM_AGENDA_ERROR:
        return {
          ...state,
          removeLoading: false,
          removeError: action.error,
        };
    case FETCH_USER_TIMETABLE:
      return {
        ...state,
        userTimetable: action.userEvents,
      };

    default:
      return state;
  }
}
