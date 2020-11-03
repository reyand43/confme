import { CLOSE_USER, OPEN_USER } from "./actionTypes"

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
        dispatch({
            type: CLOSE_USER,
        })
    }
 }