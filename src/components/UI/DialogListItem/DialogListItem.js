import React from "react";
import { UserPhoto } from "../UserPhoto/UserPhoto";
import classes from "./DialogListItem.module.scss";

export const DialogListItem = (props) => {
  return (
    <div className={classes.DialogListItem}>
      <div className={classes.DialogListItem__MessagePhoto}>
        <UserPhoto size="md" />
      </div>
      <div className={classes.MessageInfo}>
        <div className={classes.MessageInfo__Top}>
          <div className={classes.MessageInfo__Top__Name}>
            <span>
              {props.name}&nbsp;{props.surname}
            </span>
          </div>
          <div className={classes.MessageInfo__Top__Time}>
            <span>{props.time}</span>
            <i className="fa fa-times" aria-hidden="true"></i>
          </div>
        </div>
        <div className={classes.MessageInfo__Text}>{props.text}</div>
      </div>
    </div>
  );
};
