import {
  FETCH_WEBINAR_MESSAGES_ERROR,
  FETCH_WEBINAR_MESSAGES_START,
  FETCH_WEBINAR_MESSAGES_SUCCESS,
  SEND_WEBINAR_MESSAGE_ERROR,
  SEND_WEBINAR_MESSAGE_START,
  SEND_WEBINAR_MESSAGE_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  messages: [],
  messagesLoading: false,
  messagesError: null,
};

export default function webinarReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_WEBINAR_MESSAGES_START:
      return {
        ...state,
        messagesLoading: true,
      };
    case FETCH_WEBINAR_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.messages,
        messagesLoading: false,
      };
    case FETCH_WEBINAR_MESSAGES_ERROR:
      return {
        ...state,
        messagesLoading: false,
        messagesError: action.error,
      };
    case SEND_WEBINAR_MESSAGE_START:
      return {
        ...state,
      };
    case SEND_WEBINAR_MESSAGE_SUCCESS:
      return {
        ...state,
      };
    case SEND_WEBINAR_MESSAGE_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
}
