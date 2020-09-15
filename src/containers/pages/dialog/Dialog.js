import React from "react";

import { connect } from "react-redux";
import classes from "./Dialog.module.scss";
import MyMessage from "../../../components/UI/Messages/MyMessage/MyMessage";
import FriendMessage from "../../../components/UI/Messages/FriendMessage/FriendMessage";
import {sendMessages } from "../../../store/actions/dialog";
import { db } from "../../../services/firebase";

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      content: "",
      userId: localStorage.getItem("userId"),
      friendId: this.props.match.params.id,
      data: null
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.sendHandler = this.sendHandler.bind(this);
  }

  renderMessages() {
    return this.state.chats.map((chat) => {
      return (
        chat.uid === this.state.userId ? 
          (<li key={chat.timestamp}>
          <div className={classes.right}>
            <MyMessage name={chat.name} surname={chat.surname} time={this.formatTime(chat.timestamp)}text={chat.content} />
            
          </div>
        </li>)
        : (<li key={chat.timestamp}>
          <div className={classes.left}>
            <FriendMessage name={this.props.user.Name} surname={this.props.user.Surname} time={this.formatTime(chat.timestamp)}text={chat.content} />
            
          </div>
        </li>) 
        
      );
    });
  }

  //загрузить сообщения
  async componentDidMount() {    
    try {
      db.ref("chats/" + this.state.userId + "/" + this.state.friendId + "/").on(
        "value",
        (snapshot) => {
          let chats = [];
          snapshot.forEach((snap) => {
            chats.push(snap.val());
          });
          chats.sort(function (a, b) {
            return a.timestamp - b.timestamp;
          });
          this.setState({ chats });
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  changeHandler(event) {
    this.setState({
      content: event.target.value,
    });
  }

  sendHandler = () => {
    this.props.sendMessages(
      this.state.userId,
      this.state.content,
      this.state.friendId,
      this.props.name,
      this.props.surname,
      this.props.user.Name,
      this.props.user.Surname

      
    );
    this.setState({
      content: "",
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  //редактировать время
  formatTime(timestamp) {
    const d = new Date(timestamp);
    const time = `${d.getHours()}:${d.getMinutes()}`;
    return time;
  }

  render() {
    console.log("props", this.props);
    return (
      <div className={classes.Dialog}>
        <div className={classes.chatHeader}>
          <h1>{this.props.user.Name}&nbsp;{this.props.user.Surname}</h1>
        </div>
        <div className={classes.chatBody}>
          <ul>
            {this.state.chats.length !== 0 ? (
              this.renderMessages()
            ) : (
              <p>Loading</p>
            )}
          </ul>
        </div>
        <div className={classes.chatFooter}>
          <form onSubmit={this.submitHandler}>
            <input
              name="content"
              value={this.state.content}
              onChange={this.changeHandler}
              placeholder="Введите ваше сообщение"
              type="text"
            />

            <button onClick={this.sendHandler} type="submit">
              send
            </button>
            
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.users.user,
    name: state.editProfile.name,
    surname: state.editProfile.surname
    // content: state.dialog.content,
    // chats: state.dialog.chats,
    // loadingChats: state.dialog.loadingChats,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // fetchMessages: (friendId, userId) =>
    //   dispatch(fetchMessages(friendId, userId)),
    sendMessages: (userId, content, friendId, name, surname, withName, withSurname) =>
      dispatch(sendMessages(userId, content, friendId, name, surname, withName, withSurname)),
    

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
