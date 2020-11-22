import { FETCH_SPONSORS_ERROR, FETCH_SPONSORS_START, FETCH_SPONSORS_SUCCESS, FETCH_SPONSOR_BY_ID_ERROR, FETCH_SPONSOR_BY_ID_START, FETCH_SPONSOR_BY_ID_SUCCESS, SELECT_SPONSOR } from "../actions/actionTypes";


const initialState = {
 sponsors: [],
 sponsorsLoading: false,
 sponsor: [],
 sponsorLoading: false
};

export default function sponsorsReducer(state = initialState, action) {
  switch (action.type) {
   
    case FETCH_SPONSORS_SUCCESS:
      return {
        ...state,
        sponsorsLoading: false,
        sponsors: action.sponsors
      };
    case FETCH_SPONSORS_START:
      return {
        ...state,
        sponsorsLoading: true,
      };
      case FETCH_SPONSORS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
      case FETCH_SPONSOR_BY_ID_SUCCESS:
        return {
          ...state,
          sponsorLoading: false,
          sponsor: action.sponsor
        };
      case FETCH_SPONSOR_BY_ID_START:
        return {
          ...state,
          sponsorLoading: true,
        };
        case FETCH_SPONSOR_BY_ID_ERROR:
        return {
          ...state,
          sponsorLoading: false,
          error: action.error
        };
       
       

    default:
      return state;
  }
}
