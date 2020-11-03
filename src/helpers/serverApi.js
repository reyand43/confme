import io from 'socket.io-client'
import { username } from '../../../confme-backend/app/config/db.config';

class serverApi {
    constructor() {
        this.socket = null;
        this.token = null;
    }
    connect = (url) => {
        this.socket = io(url);
    }

    // Params:
    //  data = {name, surname, email, password}
    // return: 
    //  {status: 'success', message: 'User registred'} 
    //  {status: 'error', message: 'Cannot register user'} 
    signUp = (data) => {
        let response = null;
        this.socket.emit(
            "registration",
            {
              name: data.name,
              surname: data.surname,
              email: data.email,
              password: data.password,
            },
            (res) => {
              console.log('signUp: ', res);
              response = JSON.parse(res);
            }
          );
        return response;
    }

    // Params:
    //  data = { email, password }
    // return: 
    //  {status: 'success', message: {
    //      id: user_id,
    //      name: user_name,
    //      surname: user_surname,
    //      accessToken: user_token
    //  }} 
    //  {status: 'error', message: "User doesn`t exist"} 
    //  {status: 'error', message: "Password isn`t valid"} 
    signIn = (data) => {
        let response = null;
        this.socket.emit(
            "authentication",
            { email: data.email, password: data.password },
            (res) => {
              console.log('signIn: ', res);
              response = JSON.parse(res);
            }
          );
        if(response && response.status === 'success'){
            this.token = response.message.accessToken;
            this.socket.emit('join', {user_id: response.message.id}, (res) => {
                console.log('SignIn subscribe on messages: ', res);
            })
        }
        return response;
    }

    // Params:
    //  data = { sender_id, reciever_id, text }
    // return: 
    //  {status: 'success', message: 'Message sent'} 
    sendMessage = (data) => {
        socket.emit('message', 
            {sender_id: data.sender_id, reciever_id: data.reciever_id, text: data.text}, 
            (res) => {
                console.log(res);
        });
    }
}

const api = new serverApi();
export default api;
