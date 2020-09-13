import {
  NAVBAR_CHANGE_DD_VISIBILITY,
  NAVBAR_DD_REDIRECT,
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

export function changeProfileClicked(isProfile) {
  return (dispatch) => {
    dispatch({
      type: NAVBAR_DD_REDIRECT,
      profileRedirect: isProfile,
    });
  };
}
