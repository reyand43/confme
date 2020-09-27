import React from "react";
import classes from "./UserItem.module.scss";
import { UserPhoto } from "../UserPhoto/UserPhoto";

export const UserItem = (props) => {
  return (
    <div className={classes.UserItem}>
      <UserPhoto />
      <div className = {classes.UserItem__Texts}>
        <p>
          {props.name}&nbsp;{props.surname}
        </p>
        <p className = {classes.UserItem__Texts__Under}>
          {props.accountType}
        </p>
      </div>
    </div>
  );
};
