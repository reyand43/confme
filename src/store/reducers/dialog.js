import {
  CLEAR_STATE,
  FETCH_MESSAGES_ERROR,
  FETCH_MESSAGES_START,
  FETCH_MESSAGES_SUCCESS,
  FETCH_USERS_DATA_START,
  FETCH_USERS_DATA_SUCCESS,
  SEND_MESSAGES_ERROR,
  SEND_MESSAGES_START,
  SEND_MESSAGES_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  user: localStorage.getItem("userId"),
  chats: [],
  content: "",
  readError: null,
  writeError: null,
  loadingChats: false,
  data: null
};

export default function dialogReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MESSAGES_START:
      return {
        ...state,
        loadingChats: true,
        readError: null,
      };
    case FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        chats: action.chats,
        loadingChats: false,
      };
    case FETCH_MESSAGES_ERROR:
      return {
        ...state,
        readError: action.error,
        loadingChats: false
      };
      case SEND_MESSAGES_START:
      return {
        ...state,
        writeError: null,
        
      };
    case SEND_MESSAGES_SUCCESS:
      return {
        ...state,
        content: action.content,

      };
    case SEND_MESSAGES_ERROR:
      return {
        ...state,
        writeError: action.error,
      };
      case FETCH_USERS_DATA_START:
      return {
        ...state,
      };
      case FETCH_USERS_DATA_SUCCESS:
      return {
        ...state,
        data: action.data,
      };
      case CLEAR_STATE:
        return{
          chats: [],
  content: "",
  readError: null,
  writeError: null,
  loadingChats: false,
  data: null
        }
    default:
      return state;
  }
}
