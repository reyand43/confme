import React from "react";
import { connect } from "react-redux";
import { BGMain } from "../../../components/UI/BGMain/BGMain";
import { BGSide } from "../../../components/UI/BGSide/BGSide";
import classes from "./Webinar.module.scss";
import {
  fetchWebinarMessages,
  sendWebinarMessage,
} from "../../../store/actions/webinar";
import { MyWebinarMessage } from "../../../components/UI/WebinarMessages/MyWebinarMessage";
import { WebinarMessage } from "../../../components/UI/WebinarMessages/WebinarMessage";
import { ScrollBar } from "../../../components/UI/ScrollBar/ScrollBar";
import { fetchUserById } from "../../../store/actions/users";
import {
  openUserCard,
  closeUserCard,
} from "../../../store/actions/openUserCard";
import { UserCard } from "../../../components/UI/UserCard/UserCard";
import { Loader } from "../../../components/UI/Loader/Loader";
import { even } from "is_js";

class Webinar extends React.Component {
  state = {
    content: "", //введенное сообщение
  };
  messagesEnd = React.createRef();

  changeHandler = (event) => {
    this.setState({
      content: event.target.value, //кладем в стейт значения из инпута
    });
  };

  sendHandler = (event) => {
    event.preventDefault()
    this.state.content.trim() !== "" &&
      this.props.sendWebinarMessage(
        localStorage.getItem("userId"),
        this.state.content,
        this.props.userData.Name,
        this.props.userData.Surname,
        this.props.match.params.id
      );
    this.state.content !== "" &&
      this.setState({
        content: "", //после отправки обнуляем то что в стейте сообщения
      });
  };

  openSideCard = (UserId) => {
    console.log("l");
    this.props.fetchUserById(UserId);
    this.props.openUserCard(this.props.user);
  };

  renderMessages() {
    //ренедрим список сообщений
    return this.props.webinarMessages.map((message) => {
      return localStorage.getItem("userId") === message.UserId ? (
        <li key={message.Timestamp}>
          <MyWebinarMessage
            Time={this.formatTime(message.Timestamp)}
            Text={message.Content}
          />
        </li>
      ) : (
        <li
          key={message.Timestamp}
          onClick={this.openSideCard.bind(this, message.UserId)}
        >
          <WebinarMessage
            userId={message.UserId}
            Name={message.Name}
            Surname={message.Surname}
            Time={this.formatTime(message.Timestamp)}
            Text={message.Content}
          />
        </li>
      );
    });
  }

  formatTime(timestamp) {
    //приводим время в нормальный вид
    const d = new Date(timestamp);
    const time = `${d.getHours()}:${d.getMinutes()}`;
    return time;
  }

  componentDidMount() {
    this.props.fetchWebinarMessages(this.props.match.params.id); //загружаем диалоги по нашему id
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ block: "end", behavior: "auto" });
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount(){
    this.props.closeUserCard()
  }

  render() {
    return (
      <>
        <BGMain>
          <div className={classes.Webinar}>
            <div className={classes.Webinar__Toolbar}>
              <div className={classes.Webinar__Toolbar__Title}>
                <span>Диджитал решения в организации мероприятий</span>
              </div>
              <div className={classes.Webinar__Toolbar__Buttons}>
                <button>
                  127 <i className="fa fa-eye" aria-hidden="true"></i>
                </button>
                <button>
                  <i className="fa fa-cog" aria-hidden="true"></i>
                </button>
                <button>
                  <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                </button>
                <button className={classes.Webinar__Toolbar__Buttons__Exit}>
                  Выйти
                </button>
              </div>
            </div>
            <iframe
              className={classes.Webinar__Video}
              src="https://www.youtube.com/embed/QDHYQ9Nd-GU"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </BGMain>
        <BGSide wide={true}>
          <div className={classes.Webinar__Chat}>
            {this.props.openUser && (
              <div className={classes.Webinar__Wrapper}>
                {this.props.userLoading ? (
                  <Loader />
                ) : (
                  <UserCard user={this.props.user}>
                    <i
                      onClick={this.props.closeUserCard}
                      className="fa fa-times"
                    ></i>
                  </UserCard>
                )}
              </div>
            )}
            <div className={classes.Webinar__Chat__Top}>
              <span>Чат</span>
            </div>
            <div className={classes.Webinar__Chat__Messages}>
              <ScrollBar noScrollY={true}>
                <ul>
                  {this.renderMessages()}
                  <li
                    ref={(el) => {
                      this.messagesEnd = el;
                    }}
                  ></li>
                </ul>
              </ScrollBar>
            </div>
            <div className={classes.Webinar__Chat__Input}>
              <form onKeyPress={event => {
                    if (event.key === 'Enter') {
                      this.sendHandler(event)
                    }
                  }} >
              <input
                onChange={this.changeHandler}
                value={this.state.content}
                placeholder="Введите сообщение"
              />
              {this.state.content !== "" && (
                <i
                  className="fa fa-paper-plane-o"
                  aria-hidden="true"
                  onClick={this.sendHandler}
                ></i>
              )}
              </form>
            </div>
          </div>
        </BGSide>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    webinarMessages: state.webinar.messages,
    userData: state.editProfile.userData,
    user: state.users.user,
    userLoading: state.users.userLoading,
    openUser: !!state.openUserCard.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openUserCard: (user) => dispatch(openUserCard(user)),
    closeUserCard: () => dispatch(closeUserCard()),
    fetchUserById: (UserId) => dispatch(fetchUserById(UserId)),
    fetchWebinarMessages: (webinarId) =>
      dispatch(fetchWebinarMessages(webinarId)),
    sendWebinarMessage: (userId, content, name, surname, webinarId) =>
      dispatch(sendWebinarMessage(userId, content, name, surname, webinarId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Webinar);
