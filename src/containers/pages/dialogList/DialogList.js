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
import { UserCard } from "../../../components/UI/UserCard/UserCard";
import Messages from "../messages/Messages";
import { ScrollBar } from "../../../components/UI/ScrollBar/ScrollBar";
import SearchInput from "../../../components/UI/Input/SearchInput/SearchInput";

class DialogList extends React.Component {
  state = {
    dialogId: null, //id диалога
    content: "", //введенное сообщение
  };

  componentDidMount() {
    this.props.fetchDialogs(localStorage.getItem("userId")); //загружаем диалоги по нашему id
    
    this.props.selectDialog(null);
    
    if (document.location.pathname.slice(9).length > 0) {
      //если ссылка содержит id то

      this.props.selectDialog(document.location.pathname.slice(9)); //вызываем ф-ию selectDialog с айди из ссылки
      this.props.fetchUserById(document.location.pathname.slice(9))
    }
  }

  


  renderDialogs() {
    const uid = localStorage.getItem("userId");

    if (this.props.dialogsLoading) {
      //если диалоги загружаются то функция ничего не возвращает
      return null;
    } else {
      return this.props.dialogs.map((dialog) => {
        return (
          <NavLink
            key={dialog.withId}
            to={"/dialogs/" + dialog.withId}
            onClick={() => {
              this.props.selectDialog(dialog.withId);
              this.props.fetchUserById(dialog.withId)
            }}
          >
            <li>
              <DialogListItem
                id={dialog.withId}
                name={dialog.withName}
                surname={dialog.withSurname}
                text={
                  dialog.userid === uid
                    ? `Вы: ${dialog.lastMessage}`
                    : dialog.lastMessage
                }
                time={this.formatTime(dialog.timestamp)}
                selected={this.props.selectedDialog}
              />
            </li>
          </NavLink>
        );
      });
    }
  }

 formatTime(timestamp) {
    const d = new Date(timestamp);
    const time = `${d.getHours()}:${d.getMinutes()}`;
    return time;
  }

  changeHandler = (event) => {
    this.setState({
      content: event.target.value, //кладем в стейт значения из инпута
    });
  };

  sendHandler = () => { //отсыдаем сообщения
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

  // dataSearch = (e) => {
  //   const value = e.target.value.toLowerCase();
  //   const filter = this.props.users.filter((user) => {
  //     return (user.Name.toLowerCase().includes(value) || user.Surname.toLowerCase().includes(value));
  //   });
  //   this.props.setSearchedUsers(filter)
  // };

  render() {
    return (
      <>
      
        <BGMain>
          <div className={classes.ChatBox}>
            <div className={classes.ChatBox__DialogList}>
              <div className={classes.ChatBox__DialogList__SearchBar}>
                <i className="fa fa-search"></i>
                <input placeholder="Поиск..." onChange={this.dataSearch}/>
                
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              </div>
              <div className={classes.ChatBox__DialogList__ScrollList}>
                {this.props.dialogsLoading && <Loader />}

                <ScrollBar><ul>{this.renderDialogs()}</ul></ScrollBar>

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
                  {this.props.messages.length === 0 ? (
                    this.props.messagesLoading ? <Loader/> :
                    <div
                      className={
                        classes.ChatBox__MessageBox__Messages__NoMessages
                      }
                    >
                      <span>У вас пока нет сообщений</span>
                    </div>
                  ) : (
                    <ScrollBar>
                    <Messages messages={this.props.messages} />
                    </ScrollBar>
                  )}
                </div>
                <div className={classes.ChatBox__MessageBox__BottomBar}>
                  <div
                    className={
                      classes.ChatBox__MessageBox__BottomBar__AttachButton
                    }
                  >
                    <i className="fa fa-paperclip" aria-hidden="true"></i>
                  </div>
                  <div className={classes.ChatBox__MessageBox__BottomBar__Input}>
                    <input
                      placeholder="Напишите сообщение"
                      name="content"
                      value={this.state.content}
                      onChange={this.changeHandler}
                      type="text"
                      ref={input => input && input.focus()}
                      onKeyPress={event => {
                        if (event.key === 'Enter') {
                          this.sendHandler()
                        }
                      }} //после нажатия на enter, отправляется сообщение
                    />
                  </div>
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
        {document.location.pathname.slice(9).length > 0 && (
          <BGSide padding={true}>
            {this.props.dialogInfo && (
              
              <UserCard
                
                dialog={true}
                user={this.props.user}
                loading={this.props.userLoading}
              />
            )}
          </BGSide>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    dialogsLoading: state.dialogList.dialogsLoading,
    dialogs: state.dialogList.dialogs,
    user: state.users.user,
    userLoading: state.users.userLoading,
    messages: state.dialogList.messages,
    messagesLoading: state.dialogList.messagesLoading,
    selectedDialog: state.dialogList.selectedDialog,
    dialogInfo: state.dialogList.dialogInfo,
    myName: state.editProfile.userData.Name,
    mySurname: state.editProfile.userData.Surname,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDialogs: (userId) => dispatch(fetchDialogs(userId)),
    fetchUserById: (friendId) => dispatch(fetchUserById(friendId)),
    //setSearchedUsers: (filter) => dispatch(setSearchedUsers(filter)),
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
