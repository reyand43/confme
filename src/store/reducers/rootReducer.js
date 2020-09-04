import authReducer from './auth'
import timetableReducer from './timetable'
import editProfileReducer from './editProfile'
import { combineReducers } from 'redux'

export default combineReducers({
    auth: authReducer,
    timetable: timetableReducer,
    editProfile: editProfileReducer
})