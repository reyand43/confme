import { AUTH_SUCCESS, AUTH_LOGOUT, AUTH_ERROR, LOGIN_ERROR } from "../actions/actionTypes";

const initialState = {
  token: null,
  authError: false,
  loginError: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null
      }
    case AUTH_SUCCESS:
      return {
        ...state,
        authError: false,
        loginError: false,
        token: action.token
      }
    case AUTH_ERROR:
      return{
        ...state,
        authError: true
      }
      case LOGIN_ERROR:
      return{
        ...state,
        loginError: true
      }
    default:
      return state;
  }
}
