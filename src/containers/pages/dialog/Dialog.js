import React from "react";

import { connect } from "react-redux";
import classes from "./Dialog.module.scss";
import MyMessage from "../../../components/UI/Messages/MyMessage/MyMessage";
import FriendMessage from "../../../components/UI/Messages/FriendMessage/FriendMessage";
import { sendMessages, clearState } from "../../../store/actions/dialog";
import { db } from "../../../services/firebase";
import { fetchUserById} from "../../../store/actions/users";
import { UserPhoto } from "../../../components/UI/UserPhoto/UserPhoto";
import { Loader } from "../../../components/UI/Loader/Loader";
import {NavLink} from 'react-router-dom'

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      content: "",
      userId: localStorage.getItem("userId"),
      friendId: this.props.match.params.id,
      data: null,
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.sendHandler = this.sendHandler.bind(this);
    this.myRef = React.createRef();
  }

  renderMessages() {
    return this.state.chats.map((chat) => {
      return chat.uid === this.state.userId ? (
        <li key={chat.timestamp}>
          <div className={classes.right}>
            <MyMessage
              name={chat.name}
              surname={chat.surname}
              time={this.formatTime(chat.timestamp)}
              text={chat.content}
            />
          </div>
        </li>
      ) : (
        <li key={chat.timestamp}>
          <div className={classes.left}>
            <FriendMessage
              name={this.props.user.Name}
              surname={this.props.user.Surname}
              time={this.formatTime(chat.timestamp)}
              text={chat.content}
            />
          </div>
        </li>
      );
    });
  }

  //загрузить сообщения
  async componentDidMount() {
    const chatArea = this.myRef.current;
    try {
      this.props.fetchUserById(this.props.match.params.id);

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
          chatArea.scrollBy(0, chatArea.scrollHeight);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  componentWillUnmount(){
      this.props.clearState()
  }

  changeHandler(event) {
    this.setState({
      content: event.target.value,
    });
  }

  sendHandler = () => {
    const chatArea = this.myRef.current;
    this.props.sendMessages(
      this.state.userId,
      this.state.content,
      this.state.friendId,
      this.props.name,
      this.props.surname,
      this.props.user.Name,
      this.props.user.Surname,
      this.props.match.params.id
    );
    this.setState({
      content: "",
    });
    chatArea.scrollBy(0, chatArea.scrollHeight);
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
      <div className={classes.wrapper}>
        <div className={classes.Dialog}>
          <div className={classes.Dialog__chatHeader}>
          <NavLink  to={"/dialogs/"} className={classes.nostyle}>
            <div className={classes.Dialog__chatHeader__backButton}>
              <i class="fa fa-angle-left" aria-hidden="true"></i>
              <span>Назад</span>
            </div>
           </NavLink>
            <NavLink  to={"/users/" + this.props.match.params.id} className={classes.nostyle}>
              <span className={classes.Dialog__chatHeader__userName}>
                
                {this.props.user.Name}&nbsp;{this.props.user.Surname}
              </span>
            </NavLink>
            <div className={classes.Dialog__chatHeader__userPhoto}>
            <NavLink  to={"/users/" + this.props.match.params.id}><UserPhoto /></NavLink>
            </div>
          </div>
          <div className={classes.Dialog__chatBody} ref={this.myRef}>
            <ul>
              {this.state.chats.length !== 0 ? (
                this.renderMessages()
              ) : (
                <Loader />
              )}
            </ul>
          </div>
          <div className={classes.Dialog__chatFooter}>
            <form onSubmit={this.submitHandler}>
              <i class="fa fa-plus" aria-hidden="true"></i>
              <input
                name="content"
                value={this.state.content}
                onChange={this.changeHandler}
                placeholder="Введите ваше сообщение"
                type="text"
              />
              <i
                onClick={this.sendHandler}
                type="submit"
                class="fa fa-paper-plane-o"
                aria-hidden="true"
              ></i>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.users.user,
    name: state.editProfile.name,
    surname: state.editProfile.surname,
    // content: state.dialog.content,
    // chats: state.dialog.chats,
    // loadingChats: state.dialog.loadingChats,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // fetchMessages: (friendId, userId) =>
    //   dispatch(fetchMessages(friendId, userId)),
    sendMessages: (
      userId,
      content,
      friendId,
      name,
      surname,
      withName,
      withSurname,
      withId
    ) =>
      dispatch(
        sendMessages(
          userId,
          content,
          friendId,
          name,
          surname,
          withName,
          withSurname,
          withId
        )
      ),
    fetchUserById: (userId) => dispatch(fetchUserById(userId)),
    clearState: () => dispatch(clearState())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
