import { FETCH_TAGS } from "./actionTypes";
import { db } from "../../services/firebase";

export function fetchTags() {
  //загрузка спонсоров
  return async (dispatch) => {
    try {
      db.ref("tags").on("value", function (snapshot) {
        let tags = [];
        Object.keys(snapshot.val()).forEach((key, index) => {
          tags.push(snapshot.val()[key]);
        });
        dispatch(setTags(tags));
      });
    } catch (e) {
      console.log(e);
    }
  };
}

function setTags(tags) {
  return {
    type: FETCH_TAGS,
    tags,
  };
}
