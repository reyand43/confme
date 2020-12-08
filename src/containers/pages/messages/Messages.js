import React, { useEffect, useRef }  from "react";
import classes from "./Messages.module.scss";
import MyMessage from "../../../components/UI/Messages/MyMessage/MyMessage";
import FriendMessage from "../../../components/UI/Messages/FriendMessage/FriendMessage";

export default function Messages(props) {

  const messagesEnd = useRef(null)

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({block: "end"})
  }

  function renderMessages() {
    //ренедрим список сообщений
    return props.messages.map((chat, index) => {
      return chat.id === parseInt(localStorage.getItem("userId")) ? (
        <li key={index}>
          <div className={classes.right}>
            <MyMessage
              time={formatTime(chat.timestamp)}
              text={chat.text}
            />
          </div>
        </li>
      ) : (
        <li key={index}>
          <div className={classes.left}>
            <FriendMessage
              time={formatTime(chat.timestamp)}
              text={chat.text}
              name={chat.name}
              surname={chat.surname}
            />
          </div>
        </li>
      );
    });
  }

  useEffect(scrollToBottom, [props.messages]);

  function formatTime(timestamp) {
    //приводим время в нормальный вид
    const d = new Date(timestamp);
    const time = `${d.getHours()}:${d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()}`;
    return time;
  }

  return (
    <div className={classes.Messages}>
      <ul>
        {renderMessages()}
        <li
          ref={messagesEnd}
        ></li>
      </ul>
    </div>
  );
}
