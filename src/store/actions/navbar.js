import {
  NAVBAR_CHANGE_DD_VISIBILITY,
  NAVBAR_HIDE_DD,
} from "./actionTypes";

export function changeVisibility() {
  return (dispatch) => {
    dispatch({
      type: NAVBAR_CHANGE_DD_VISIBILITY,
    });
  };
}

export function hideDropDown() {
  return (dispatch) => {
    dispatch({
      type: NAVBAR_HIDE_DD,
    });
  };
}

