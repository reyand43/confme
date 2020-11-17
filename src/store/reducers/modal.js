import { TOGGLE_MODAL } from "../actions/actionTypes";

const initialState ={
    modalOpenState: false,
    
}

export default function modalReducer(state = initialState, action) {
    switch (action.type) {
      case TOGGLE_MODAL:
        return {
          ...state,
          modalOpenState: !state.modalOpenState,
         
        };
    default: return state;
    }
}