import authReducer from './auth'
import timetableReducer from './timetable'
import editProfileReducer from './editProfile'
import navbarReducer from './navbar'
import { combineReducers } from 'redux'

export default combineReducers({
    auth: authReducer,
    timetable: timetableReducer,
    editProfile: editProfileReducer,
    navbar: navbarReducer
})