import React from "react";
import classes from "./DialogList.module.scss";
import { DialogListItem } from "../../../components/UI/DialogListItem/DialogListItem";
import { connect } from "react-redux";
import {
  fetchDialogInfo,
  fetchDialogs,
  selectDialog,
  sendMessages,
} from "../../../store/actions/dialogList";
import { fetchUserById } from "../../../store/actions/users";
import { NavLink } from "react-router-dom";
import { BGMain } from "../../../components/UI/BGMain/BGMain";
import { BGSide } from "../../../components/UI/BGSide/BGSide";
import { Loader } from "../../../components/UI/Loader/Loader";
import {UserCard} from "../../../components/UI/UserCard/UserCard";
import Messages from "../messages/Messages";

class DialogList extends React.Component {
  state = {
    dialogId: this.props.match.params.id,
    chats: [],
    content: "",
    data: null,
  };

  componentDidMount() {
    this.props.fetchDialogs(localStorage.getItem("userId"));
    if (document.location.pathname.slice(9).length > 0) {
      this.props.selectDialog(document.location.pathname.slice(9));
    } else {
      this.props.fetchDialogInfo(null);
      this.props.selectDialog(null)
    }
    
  }

  renderDialogs() {
    const uid = localStorage.getItem("userId");

    if (this.props.dialogsLoading) {
      return null;
    } else {
      return this.props.dialogs.map((dialog) => {
        return (
          <NavLink
            key={dialog.withId}
            to={"/dialogs/" + dialog.withId}
            onClick={() => {
              this.props.selectDialog(dialog.withId);
            }}
          >
            <li>
              <DialogListItem
                name={dialog.withName}
                surname={dialog.withSurname}
                text={
                  dialog.userid === uid
                    ? `Вы: ${dialog.lastMessage}`
                    : dialog.lastMessage
                }
                time={dialog.timestamp}
              />
            </li>
          </NavLink>
        );
      });
    }
  }

  changeHandler = (event) => {
    this.setState({
      content: event.target.value,
    });
  };

  

  sendHandler = () => {
    this.props.sendMessages(
      localStorage.getItem("userId"), //мой id
      this.state.content, //текст сообщения
      this.props.selectedDialog, //С кем чатимся
      this.props.myName, //мое имя
      this.props.mySurname, //моя фамилия
      this.props.dialogInfo.Name, //имя с кем чатимся
      this.props.dialogInfo.Surname, //фамилия с кем чатимся
      this.props.selectedDialog
    );
    this.setState({
      content: "", //после отправки обнуляем то что в стейте сообщения
    });
  };

  

  render() {
    return (
      <>
        <BGMain>
          <div className={classes.ChatBox}>
            <div className={classes.ChatBox__DialogList}>
              <div className={classes.ChatBox__DialogList__SearchBar}>
                <i className="fa fa-search"></i>
                <input placeholder="Поиск..." />
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              </div>
              <div className={classes.ChatBox__DialogList__ScrollList}>
                {this.props.dialogsLoading && <Loader />}
                <ul>{this.renderDialogs()}</ul>
              </div>
            </div>

            {this.props.match.params.id === undefined ? (
              <div className={classes.ChatBox__ChooseDialog}>
                <p>Выберете диалог</p>
              </div>
            ) : (
              <div className={classes.ChatBox__MessageBox}>
                <div className={classes.ChatBox__MessageBox__TopBar}>
                  {this.props.dialogInfo !== null && (
                    <span
                      className={
                        classes.ChatBox__MessageBox__TopBar__DialogName
                      }
                    >
                      {this.props.dialogInfo.Name}{" "}
                      {this.props.dialogInfo.Surname}
                    </span>
                  )}

                  <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                </div>
                <div className={classes.ChatBox__MessageBox__Messages}>
                  {this.props.messages.length === 0 ? <div  className={classes.ChatBox__MessageBox__Messages__NoMessages}><span>У вас пока нет сообщений</span></div> :
                  <Messages messages={this.props.messages} />}
                </div>
                <div className={classes.ChatBox__MessageBox__BottomBar}>
                  <div
                    className={
                      classes.ChatBox__MessageBox__BottomBar__AttachButton
                    }
                  >
                    <i className="fa fa-paperclip" aria-hidden="true"></i>
                  </div>

                  <input
                    placeholder="Напишите сообщение"
                    name="content"
                    value={this.state.content}
                    onChange={this.changeHandler}
                    type="text"
                    
                  />
                  <div
                    className={
                      classes.ChatBox__MessageBox__BottomBar__SendButton
                    }
                  >
                    <i
                      className="fa fa-paper-plane-o"
                      aria-hidden="true"
                      onClick={this.sendHandler}
                    ></i>
                  </div>
                </div>
              </div>
            )}
          </div>
        </BGMain>
        {document.location.pathname.slice(9).length > 0 && 
        <BGSide>
          {this.props.dialogInfo &&
            <UserCard
            dialog = {true}
            name={this.props.dialogInfo.Name}
                      surname={this.props.dialogInfo.Surname}
                      city={this.props.user.City}
                      country={this.props.user.Country}
                      role={this.props.user.AccountType}
                      id={this.props.user.id}/>
          }
          
        </BGSide>}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    dialogsLoading: state.dialogList.dialogsLoading,
    dialogs: state.dialogList.dialogs,
    user: state.users.user,
    messages: state.dialogList.messages,
    messagesLoading: state.dialogList.messagesLoading,
    selectedDialog: state.dialogList.selectedDialog,
    dialogInfo: state.dialogList.dialogInfo,
    myName: state.editProfile.name,
    mySurname: state.editProfile.surname,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDialogs: (userId) => dispatch(fetchDialogs(userId)),
    fetchUserById: (friendId) => dispatch(fetchUserById(friendId)),
    selectDialog: (dialogId) => dispatch(selectDialog(dialogId)),
    fetchDialogInfo: (dialogInfo) => dispatch(fetchDialogInfo(dialogInfo)),
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogList);




