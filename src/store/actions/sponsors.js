import { db } from "../../services/firebase";
import { FETCH_SPONSORS_ERROR, FETCH_SPONSORS_START, FETCH_SPONSORS_SUCCESS, FETCH_SPONSOR_BY_ID_ERROR, FETCH_SPONSOR_BY_ID_START, FETCH_SPONSOR_BY_ID_SUCCESS} from "./actionTypes";

export function fetchSponsors() {  //загрузка спонсоров
    return async (dispatch) => {
      dispatch(fetchSponsorsStart());
      try {
        db.ref("sponsors").on("value", function (snapshot) {
          let sponsors = []
          Object.keys(snapshot.val()).forEach((key, index) => {
            sponsors.push(snapshot.val()[key]);
           
          });
          dispatch(fetchSponsorsSuccess(sponsors));
        });
      } catch (e) {
        dispatch(fetchSponsorsError(e));
      }
    };
  }


  export function fetchSponsorsSuccess(sponsors) {
    return {
      type: FETCH_SPONSORS_SUCCESS,
      sponsors
    };
  }
  
  export function fetchSponsorsStart() {
    return {
      type: FETCH_SPONSORS_START,
    };
  }
  
  export function fetchSponsorsError(e) {
    return {
      type: FETCH_SPONSORS_ERROR,
      error: e,
    };
  }

  export function fetchSponsorById(sponsorId) {
    return async (dispatch) => {
      dispatch(fetchSponsorByIdStart());
      try {
        db.ref("sponsors/" + sponsorId).on("value", function (snapshot) {
          let sponsor = snapshot.val()
          dispatch(fetchSponsorByIdSuccess(sponsor));
        });
      } catch (e) {
        dispatch(fetchSponsorByIdError(e));
      }
    };
    
  }

  export function fetchSponsorByIdSuccess(sponsor) {
    console.log(sponsor)
    return {
      type: FETCH_SPONSOR_BY_ID_SUCCESS,
      sponsor
    };
  }
  
  export function fetchSponsorByIdStart() {
    return {
      type: FETCH_SPONSOR_BY_ID_START,
    };
  }
  
  export function fetchSponsorByIdError(e) {
    return {
      type: FETCH_SPONSOR_BY_ID_ERROR,
      error: e,
    };
  }