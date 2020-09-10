import { CHANGE_USER_NAME } from "../actions/actionTypes";

const initialState = {
    name: "",
    surname: ""
}

export default function editProfileReducer(state = initialState, action) {
    switch(action.type) {
        case CHANGE_USER_NAME:
            return {
                ...state,
                name: action.name,
                surname: action.surname,
            }
        default: return state
    }
}