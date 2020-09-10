import { HOVER_SIDEBAR } from "./actionTypes"

export function changeHover() {
    return dispatch => {
        dispatch({
            type: HOVER_SIDEBAR
        })
    }
}

