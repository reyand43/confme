import authReducer from './auth'
import timetableReducer from './timetable'
<<<<<<< HEAD
=======
import editProfileReducer from './editProfile'
>>>>>>> 9fec2aab24f965529666f95f46bb95aff1c04fee
import { combineReducers } from 'redux'

export default combineReducers({
    auth: authReducer,
<<<<<<< HEAD
    timetable: timetableReducer
=======
    timetable: timetableReducer,
    editProfile: editProfileReducer
>>>>>>> 9fec2aab24f965529666f95f46bb95aff1c04fee
})