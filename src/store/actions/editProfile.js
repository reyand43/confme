import { CHANGE_USER_NAME } from "./actionTypes"

export function updateUserName(name, surname) {
    return dispatch => {
        dispatch({
            type: CHANGE_USER_NAME,
            name, surname
        })
    }
}