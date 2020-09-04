import {SEND_NEW_PROFILE_DATA} from './actionTypes'
import axios from '../../axios/axios';


export function sendNewProfileData(name, surname, age) {
    return async (getState) => {
        await axios.post("/profileData.json", getState().create.data);
        
    }
}