import { TOGGLE_MODAL } from "./actionTypes";

export function toggleModal(user) {
    return (dispatch) => {
      dispatch({
        type: TOGGLE_MODAL,
        user
      });
    };
  }
