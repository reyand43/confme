import { TOGGLE_MODAL } from "./actionTypes";

export function toggleModal() {
    return (dispatch) => {
      dispatch({
        type: TOGGLE_MODAL,
        
      });
    };
  }
