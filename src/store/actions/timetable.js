import { TIMETABLE_DATE } from "./actionTypes";

export function changeDate(activeDate) {
  return (dispatch) => {
    dispatch({
      type: TIMETABLE_DATE,
      activeDate,
    });
  };
}
