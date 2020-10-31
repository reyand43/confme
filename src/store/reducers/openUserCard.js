import { OPEN_USER, CLOSE_USER } from "../actions/actionTypes";

const initialState = {
    user: null
}


export default function openUserCardReducer(state = initialState, action) {
    switch (action.type) {
      case OPEN_USER:
        return {
          ...state,
          user: action.user,
        };
      case CLOSE_USER:
        return {
          ...state,
          user: null,
        };
      default:
        return state;
    }
  }