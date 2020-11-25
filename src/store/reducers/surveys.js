import { FETCH_SURVEYS_ERROR, FETCH_SURVEYS_START, FETCH_SURVEYS_SUCCESS} from "../actions/actionTypes";


const initialState = {
 surveys: [],
 SurveysLoading: false,
 survey: [],
 surveyLoading: false
};

export default function sponsorsReducer(state = initialState, action) {
  switch (action.type) {

    case FETCH_SURVEYS_SUCCESS:
      return {
        ...state,
        surveysLoading: false,
        surveys: action.surveysLoading
      };
    case FETCH_SURVEYS_START:
      return {
        ...state,
        surveysLoading: true,
      };
      case FETCH_SURVEYS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };



    default:
      return state;
  }
}
