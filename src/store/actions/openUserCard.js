import { CLOSE_USER, OPEN_USER } from "./actionTypes"
import { clearState } from "./users"

export function openUserCard(user) {
   return dispatch=>{
       dispatch({
           type: OPEN_USER,
           user
       })
   }
}

export function closeUserCard() {
    return dispatch=>{
        dispatch(clearState())
        dispatch({
            type: CLOSE_USER,
        })
    }
 }