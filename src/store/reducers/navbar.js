import {
  NAVBAR_CHANGE_DD_VISIBILITY,
  NAVBAR_HIDE_DD,
} from "../actions/actionTypes";

const initialState = {
  visibleDropDown: false,
};

export default function navbarReducer(state = initialState, action) {
  switch (action.type) {
    case NAVBAR_CHANGE_DD_VISIBILITY:
      return {
        ...state,
        visibleDropDown: !state.visibleDropDown,
      };
    case NAVBAR_HIDE_DD:
      return {
        ...state,
        visibleDropDown: false,
      };
    default:
      return state;
  }
}
