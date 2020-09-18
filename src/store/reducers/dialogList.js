import {
  FETCH_DIALOGS_ERROR,
  FETCH_DIALOGS_START,
  FETCH_DIALOGS_SUCCESS,
} from "../actions/actionTypes";


const initialState = {
  dialogs: [],
  loading: false,
  error: null,
};

export default function dialogListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DIALOGS_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DIALOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        dialogs: action.dialogs,
      };
    case FETCH_DIALOGS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
