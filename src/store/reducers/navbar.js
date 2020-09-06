import { FETCH_DATA_START, FETCH_DATA_SUCCESS, FETCH_DATA_ERROR } from "../actions/actionTypes";

const initialState = {
   name: null,
   surname: null,
   loading: false,
   error: null
}

export default function navbarReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_DATA_START:
            return {
                ...state,
                loading: true,
            }
        case FETCH_DATA_SUCCESS:
            return{
                ...state,
                loading: false,
                name: action.name,
                surname: action.surname
            }
        case FETCH_DATA_ERROR:
            return{
                ...state,
                loading: false,
                error: action.error
            }
        default: 
        return state;
    }
}