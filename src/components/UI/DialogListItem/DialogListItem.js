import React from "react";
import { UserPhoto } from "../UserPhoto/UserPhoto";
import classes from "./DialogListItem.module.scss";

export const DialogListItem = (props) => {


  const cls = [classes.DialogListItem];
  if(props.id === props.selected) {
      cls.push(classes.selected)
  }


  return (
    <div className={cls.join(" ")}>
      <div className={classes.DialogListItem__Content}>
        <UserPhoto size="md" />
        <div className={classes.DialogListItem__Content__MessageInfo}>
          <div className={classes.DialogListItem__Content__MessageInfo__Name}>
            <span>
              {props.name} {props.surname}
            </span>
          </div>
          <div className={classes.DialogListItem__Content__MessageInfo__Text}>
            <span>
              {props.text}
            </span>
          </div>
        </div>
        <div className={classes.DialogListItem__Content__MessageData}>
         <div className={classes.DialogListItem__Content__MessageData__Time}>{formatTime(props.time)}</div>
         {props.unread > 0 ? <div className={classes.DialogListItem__Content__MessageData__Unread}>
            <span>{props.unread}</span>
         </div> : null}

        </div>
      </div>
    </div>
  );
};

function formatTime(timestamp) {  //приводим время в нормальный вид
  const d = new Date(timestamp);
  const time = `${d.getHours()}:${d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()}`;
  return time;
}
