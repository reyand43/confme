import {SEND_NEW_PROFILE_DATA} from '../actions/actionTypes'

const initialState = {
    data: []
  };

export default function editProfileReducer(state=initialState, action) {
    switch (action.type) {
        case SEND_NEW_PROFILE_DATA:
            return{
            ...state,
            data: [...state.data, action.item]
            }
        default:
            return state
    }
    
}