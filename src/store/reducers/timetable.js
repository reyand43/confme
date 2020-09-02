import { TIMETABLE_DATE } from "../actions/actionTypes";

const initialState = {
  activeDate: 0,
};

export default function timetableReducer(state = initialState, action) {
  switch (action.type) {
    case TIMETABLE_DATE:
      return {
        ...state,
        activeDate: action.activeDate,
      };
    default:
      return state;
  }
}
