import { FETCH_TAGS} from "../actions/actionTypes";

const initialState ={
    tags: [],
    
}

export default function tagsReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_TAGS:
        return {
          ...state,
          tags: action.tags,
         
        };
    default: return state;
    }
}