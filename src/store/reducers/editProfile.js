import {
  FETCH_USER_DATA_ERROR,
  FETCH_USER_DATA_START,
  FETCH_USER_DATA_SUCCESS,
  SEND_USER_DATA_ERROR,
  SEND_USER_DATA_START,
  SEND_USER_DATA_SUCCESS_HIDE,
  SEND_USER_DATA_SUCCESS_SHOW,
} from "../actions/actionTypes";

const initialState = {
  userData: [],
  userDataLoading: false,
  userDataError: null,
  sendUserDataLoading: false,
  sendUserDataError: null,
  userDataSent: false
};

export default function editProfileReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        userData: action.userData,
        userDataLoading: false
      };
    case FETCH_USER_DATA_START:
      return {
        ...state,
        userDataLoading: true,
      };
    case FETCH_USER_DATA_ERROR:
      return {
        ...state,
        userDataError: action.error,
        userDataLoading: false
      };
      ////
    case SEND_USER_DATA_SUCCESS_SHOW:
      return {
        ...state,
        userDataSent: true,
        sendUserDataLoading: false
      };
      case SEND_USER_DATA_SUCCESS_HIDE:
        return {
          ...state,
          userDataSent: false
        };
    case SEND_USER_DATA_START:
      return {
        ...state,
        sendUserDataLoading: true
      };
    case SEND_USER_DATA_ERROR:
      return {
        ...state,
        sendUserDataLoading: false,
        sendUserDataError: action.error
      };
    default:
      return state;
  }
}
