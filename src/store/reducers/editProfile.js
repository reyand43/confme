import { CHANGE_USER_NAME, LOAD_USERNAME_FROM_SERVER, CLEAR_USER_NAME } from "../actions/actionTypes";

const initialState = {
    name: "Неопознанный",
    surname: "Объект",
    accountType: ""
}

export default function editProfileReducer(state = initialState, action) {
    switch(action.type) {
        case CHANGE_USER_NAME:
            return {
                ...state,
                name: action.name,
                surname: action.surname,
            }
        case LOAD_USERNAME_FROM_SERVER:
            return {
                ...state,
                name: action.name,
                surname: action.surname,
                accountType: action.accType,
            }
        case CLEAR_USER_NAME:
            return {
                ...state,
                name: "Неопознанный",
                surname: "Объект",
                accountType: "Гость",
            }
        default: return state
    }
}