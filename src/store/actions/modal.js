import { TOGGLE_MODAL } from "./actionTypes";

export function openModal() {
    return (dispatch) => {
      dispatch({
        type: TOGGLE_MODAL,
      });
    };
  }