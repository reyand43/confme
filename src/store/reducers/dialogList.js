import {
  FETCH_DIALOGS_ERROR,
  FETCH_DIALOGS_START,
  FETCH_DIALOGS_SUCCESS,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_START,
  FETCH_MESSAGES_ERROR,
  SELECT_DIALOG,
  FETCH_DIALOG_INFO,
  SEND_MESSAGES_START,
  SEND_MESSAGES_SUCCESS,
  SEND_MESSAGES_ERROR,
  CLEAR_STATE,
  ADD_MESSAGE,
  ADD_DIALOG,
  COUNT_ALL_DIALOGS,
} from "../actions/actionTypes";

const initialState = {
  dialogs: [],
  dialogsLoading: false,
  error: null,
  messagesLoading: false,
  messages: [],
  readError: null,
  selectedDialog: null,
  dialogInfo: null,
  content: "",
  countAllDialogs: null
};

export default function dialogListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DIALOGS_START:
      return {
        ...state,
        dialogsLoading: true,
      };
    case FETCH_DIALOGS_SUCCESS:
      return {
        ...state,
        dialogsLoading: false,
        dialogs: action.dialogs,
      };
    case FETCH_DIALOGS_ERROR:
      return {
        ...state,
        dialogsLoading: false,
        error: action.error,
      };
    case FETCH_MESSAGES_START:
      return {
        ...state,
        messagesLoading: true,
      };
    case FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.messages,
        messagesLoading: false,
      };
    case FETCH_MESSAGES_ERROR:
      return {
        ...state,
        messagesLoading: false,
        readError: action.error,
      };
    case SELECT_DIALOG:
      return {
        ...state,
        selectedDialog: action.dialogId,
      };
    case FETCH_DIALOG_INFO:
      return {
        ...state,
        dialogInfo: action.dialogInfo,
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
    case CLEAR_STATE:
      return {
        ...state,
        dialogs: [],
        dialogsLoading: false,
        error: null,
        messagesLoading: false,
        messages: [],
        readError: null,
        selectedDialog: null,
        dialogInfo: null,
        content: "",
      };
    case ADD_MESSAGE:
      const newDialogs = [...state.dialogs]
      newDialogs.map(dialog => {
        if(dialog.id === action.message.dialogId) {
          dialog.lastMessage = action.message.text;
        }
      })
      return {
        ...state,
        dialogs: newDialogs,
        messages: [...state.messages, action.message]
      }
    case ADD_DIALOG:
      return {
        ...state,
        dialogs: [...state.dialogs, action.dialog]
      }
    case COUNT_ALL_DIALOGS:
      return {
        ...state,
        countAllDialogs: action.count
      }
    default:
      return state;
  }
}
