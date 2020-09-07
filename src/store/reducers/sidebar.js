import { HOVER_SIDEBAR, SIDEBAR_UPDATE_LABELS } from "../actions/actionTypes";

const initialState = {
    hover: false,
}

export default function sidebarReducer(state = initialState, action) {
    switch(action.type) {
        case HOVER_SIDEBAR:
            return {
                ...state,
                hover: !state.hover
            }
        default: return state
    }
}