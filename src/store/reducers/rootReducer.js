import authReducer from './auth'
import timetableReducer from './timetable'
import usersReducer from './users'

import { combineReducers } from 'redux'
import sidebarReducer from './sidebar'
import editProfileReducer from './editProfile'
import navbarReducer from './navbar'

export default combineReducers({
    auth: authReducer,
    timetable: timetableReducer,
    sidebar: sidebarReducer,
    editProfile: editProfileReducer,
    users: usersReducer,
    navbar: navbarReducer
})