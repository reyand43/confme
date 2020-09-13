import authReducer from './auth'
import timetableReducer from './timetable'
import usersReducer from './users'

import { combineReducers } from 'redux'
import sidebarReducer from './sidebar'
import editProfileReducer from './editProfile'
import dialogReducer from './dialog'

export default combineReducers({
    auth: authReducer,
    timetable: timetableReducer,
    sidebar: sidebarReducer,
    editProfile: editProfileReducer,
    users: usersReducer,
    dialog: dialogReducer
})