import authReducer from './auth'
import timetableReducer from './timetable'
import navbarReducer from './navbar'

import { combineReducers } from 'redux'
import sidebarReducer from './sidebar'

export default combineReducers({
    auth: authReducer,
    timetable: timetableReducer,
    navbar: navbarReducer,
    sidebar: sidebarReducer
})