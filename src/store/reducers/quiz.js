import {SELECT_QUIZ} from "../actions/actionTypes";

const initialState = {
    survey: [],
}

export default function quizReducer(state = initialState, action) {
    switch(action.type) {
        case SELECT_QUIZ:
            return {
                ...state,
                survey: action.survey
            }
        default: return state
    }
}
