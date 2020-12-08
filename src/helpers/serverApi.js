import io from "socket.io-client";

class serverApi {
  constructor() {
    this.socket = null;
    this.token = null;
  }

  connect = (url) => {
    this.socket = io(url);
  };

  // Params:
  //  data = {name, surname, email, password}
  // return:
  //  {status: 'success', message: 'User registred'}
  //  {status: 'error', message: 'Cannot register user'}
  signUp = (data) => {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        "registration",
        {
          name: data.name,
          surname: data.surname,
          email: data.email,
          password: data.password,
        },
        (res) => {
          console.log("signUp: ", res);
          return resolve(JSON.parse(res));
        }
      );
    });
  };

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
    return new Promise((resolve, reject) => {
      this.socket.emit(
        "authentication",
        { email: data.email, password: data.password },
        (res) => {
          console.log("signIn: ", res);
          const response = JSON.parse(res);
          if (response && response.status === "success") {
            this.token = response.data.accessToken;
            this.joinDialogs(response.data.id);
            this.socket.on("message", (data) => {
              console.log("Took message", data);
            });
          }
          resolve(response);
        }
      );
    });
  };

  joinDialogs = (userId) => {
    this.socket.emit(
      "join",
      { user_id: userId },
      (res) => {
        console.log("Subscribe on messages: ", res);
      }
    );
  }

  signOut = () => {
    return new Promise((resolve, reject) => {
      this.socket.emit("signOut", {data: ""}, (res) => {
        console.log("signOut: ", res);
        const response = JSON.parse(res);
        resolve(response);
      })
    })
  }

  // Params:
  //  data = { sender_id, reciever_id, text }
  // return:
  //  {status: 'success', message: 'Message sent'}
  sendMessage = (data) => {
    this.socket.emit(
      "message",
      {
        sender_id: data.sender_id,
        reciever_id: data.reciever_id,
        text: data.text,
      },
      (res) => {
        console.log(res);
      }
    );
  };

  // Params:
  //   userId : integer
  // return:
  //   {status: 'success', message: {}}
  //
  //
  //
  //
  //
  fetchDialogs = (userId) => {
    return new Promise((resolve, reject) => {
      this.socket.emit("fetchDialogs", { user_id: userId }, (res) => {
        const response = JSON.parse(res);
        resolve(response);
      });
    });
  };

  fetchDialog = (userId, friendId, dialogId = "") => {
    return new Promise((resolve, reject) => {
      if (dialogId !== "") {
        this.socket.emit("fetchDialog", { dialog_id: dialogId }, (res) => {
          console.log("Fetch dialog: ", res);
          const response = JSON.parse(res);
          resolve(response);
        });
      } else {
        this.socket.emit("fetchDialog", { user_id: userId, friend_id: friendId }, (res) => {
          console.log("Fetch dialog: ", res);
          const response = JSON.parse(res);
          resolve(response);
        });
      }
    });
  };

  fetchMessages = (dialogId) => {
    return new Promise((resolve, reject) => {
      this.socket.emit("fetchMessages", { dialog_id: dialogId }, (res) => {
        const response = JSON.parse(res);
        resolve(response);
      });
    });
  };

  fetchMessage = (messageId) => {
    return new Promise((resolve, reject) => {
      this.socket.emit("fetchMessage", { message_id: messageId }, (res) => {
        console.log("Fetch message: ", res);
        const response = JSON.parse(res);
        resolve(response);
      });
    });
  };

  fetchUsers = () => {
    return new Promise((resolve, reject) => {
      this.socket.emit("fetchUsers", {}, (res) => {
        const response = JSON.parse(res);
        resolve(response);
      });
    });
  };

  fetchUser = (userId) => {
    return new Promise((resolve, reject) => {
      this.socket.emit("fetchUser", { user_id: userId }, (res) => {
        console.log("Fetch user: ", res);
        const response = JSON.parse(res);
        resolve(response);
      });
    });
  };

  fetchPersonals = () => {
    return new Promise((resolve, reject) => {
      this.socket.emit("fetchPersonals", {}, (res) => {
        console.log("Fetch personals: ", res);
        const response = JSON.parse(res);
        resolve(response);
      });
    });
  };

  fetchPersonal = (userId) => {
    return new Promise((resolve, reject) => {
      this.socket.emit("fetchPersonal", { user_id: userId }, (res) => {
        console.log("Fetch personal: ", res);
        const response = JSON.parse(res);
        resolve(response);
      });
    });
  };

  countAllDialogs = () => {
    return new Promise((resolve, reject) => {
      this.socket.emit("countDialogs", {}, res => {
        const response = JSON.parse(res);
        resolve(response);
      })
    })
  }
}

const api = new serverApi();
export default api;
