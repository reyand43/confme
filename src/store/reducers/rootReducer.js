import authReducer from './auth'
import timetableReducer from './timetable'
import usersReducer from './users'

import { combineReducers } from 'redux'
import sidebarReducer from './sidebar'
import editProfileReducer from './editProfile'
import dialogReducer from './dialog'
import dialogListReducer from './dialogList'
import modalReducer from './modal'
import openUserCardReducer from './openUserCard'
import agendaReducer from './agenda'

export default combineReducers({
    auth: authReducer,
    timetable: timetableReducer,
    sidebar: sidebarReducer,
    editProfile: editProfileReducer,
    users: usersReducer,
    dialog: dialogReducer,
    dialogList: dialogListReducer,
    modal: modalReducer,
    openUserCard: openUserCardReducer,
    agenda: agendaReducer
})