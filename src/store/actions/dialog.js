import { SEND_MESSAGES_ERROR, SEND_MESSAGES_START, SEND_MESSAGES_SUCCESS,
  FETCH_USERS_DATA_SUCCESS, FETCH_USERS_DATA_START } from "./actionTypes";
import { db } from "../../services/firebase";
import axios from "../../axios/axios";



export function fetchUsersDataSuccess(data) {
  return {
    type: FETCH_USERS_DATA_SUCCESS,
    data,
  };
}
export function fetchUsersDataStart() {
  return {
    type: FETCH_USERS_DATA_START
  };
}

//*************НЕ ИСПОЛЬЗУЮ ТАК КАК НЕ ПОЯВЛЯЮТСЯ СООБЩЕНИЯ С ПЕРВОГО РАЗА*////////
// export function fetchMessages(friendId, userId) {
//     return async (dispatch) => {
      
//       dispatch(fetchMessagesStart());
//       let chats = [];
//       try {
       
        
//            db.ref("chats/" + userId + '/'+ friendId + "/").on("value", snapshot => {
//                   console.log(snapshot.val())
//                 snapshot.forEach((snap) => {
//                   chats.push(snap.val());
//                 });
//                 chats.sort(function (a, b) { return a.timestamp - b.timestamp })
//                 });
          
//           console.log('chats', chats)
//           dispatch(fetchMessagesSuccess(chats))
          
         
//       } catch (error) {
//           console.log(error);
//         dispatch(fetchMessagesError(error));
//       }
//     };
//   }

  

//   export function fetchMessagesSuccess(chats) {
//     return {
//       type: FETCH_MESSAGES_SUCCESS,
//       chats,
//     };
//   }
//   export function fetchMessagesStart() {
//     return {
//       type: FETCH_MESSAGES_START
//     };
//   }
//   export function fetchMessagesError(e) {
//     return {
//       type: FETCH_MESSAGES_ERROR,
//       error: e,
//     };
//   }

  export function sendMessages(userId, text, friendId, name, surname, withName, withSurname){
      return async (dispatch) =>{
        dispatch(sendMessagesStart());
        
        const postData = {
          userid: userId,
          lastMessage: text,
          timestamp: Date.now(),
          withName: withName,
          withSurname: withSurname

        }

        try {
          await db.ref("chats/" + userId + '/'+ friendId + "/" ).push({
            content: text,
            timestamp: Date.now(),
            uid: userId,
            name,
            surname
          });
          await db.ref("chats/" + friendId+ '/'+ userId + "/" ).push({
            content: text,
            timestamp: Date.now(),
            uid: userId,
            name,
            surname
          });
          await axios.patch(`/chatList/${userId}/${friendId}.json`, postData);
          postData.withName = name;
          postData.withSurname = surname;
         
          await axios.patch(`/chatList/${friendId}/${userId}.json`, postData);
          
          
          let content='';
          dispatch(sendMessagesSuccess(content))
          
        } catch (error) {
            console.log(error)
           dispatch(sendMessagesError())
        }
      }
  }

  export function sendMessagesSuccess(content) {
    return {
      type: SEND_MESSAGES_SUCCESS,
      content,
    };
  }
  export function sendMessagesStart() {
    return {
      type: SEND_MESSAGES_START
    };
  }
  export function sendMessagesError(e) {
    return {
      type: SEND_MESSAGES_ERROR,
      error: e,
    };
  }
