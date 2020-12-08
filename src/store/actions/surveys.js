import { db } from "../../services/firebase";
import { FETCH_SURVEYS_ERROR, FETCH_SURVEYS_START, FETCH_SURVEYS_SUCCESS} from "./actionTypes";

export function fetchSurveys(sponsorId) {  //загрузка спонсоров
    return async (dispatch) => {
      dispatch(fetchSurveysStart());
      try {
        db.ref("sponsors/"+sponsorId+"/surveys/0").on("value", function (snapshot) {
          let surveys = []
          Object.keys(snapshot.val()).forEach((key, index) => {
            surveys.push(snapshot.val()[key]);
          });
          dispatch(fetchSurveysSuccess(surveys));
        });
      } catch (e) {
        dispatch(fetchSurveysError(e));
      }
    };
  }


  export function fetchSurveysSuccess(surveys) {
    return {
      type: FETCH_SURVEYS_SUCCESS,
      surveys
    };
  }

  export function fetchSurveysStart() {
    return {
      type: FETCH_SURVEYS_START,
    };
  }

  export function fetchSurveysError(e) {
    return {
      type: FETCH_SURVEYS_ERROR,
      error: e,
    };
  }
