import { ADD_TO_AGENDA_ERROR, ADD_TO_AGENDA_START, ADD_TO_AGENDA_SUCCESS, FETCH_TIMETABLE_ERROR, FETCH_TIMETABLE_START, FETCH_TIMETABLE_SUCCESS, TIMETABLE_DATE } from "../actions/actionTypes";

const initialState = {
 timetable: [],
 error: null,
 loading: false,
 days: [],
 streams: []
};

export default function timetableReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TIMETABLE_SUCCESS:
        return {
          ...state,
          loading: false,
          timetable: action.timetable,
          days: action.days,
          streams: action.streams
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
          error: action.error
        };case ADD_TO_AGENDA_SUCCESS:
        return {
          ...state,
          loadingAdding: false,
        };
      case ADD_TO_AGENDA_START:
        return {
          ...state,
          loadingAdding: true,

        };
        case ADD_TO_AGENDA_ERROR:
        return {
          ...state,
          loadingAdding: false,
          errorAdding: action.error
        };

    default:
      return state;
  }
}
