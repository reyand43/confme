import authReducer from './auth'
import timetableReducer from './timetable'
import { combineReducers } from 'redux'

export default combineReducers({
    auth: authReducer,
    timetable: timetableReducer
})