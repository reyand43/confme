import {SELECT_QUIZ} from "./actionTypes"

export function selectQuiz(survey) {
    return dispatch => {
        dispatch({
            type: SELECT_QUIZ,
            survey
        })
    }
}
