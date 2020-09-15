import React from "react";
import classes from "./UserItem.module.scss";
import { UserPhoto } from "../UserPhoto/UserPhoto";

export const UserItem = (props) => {
  return (
    <div className={classes.UserItem}>
      <UserPhoto />
      <p>
        {props.name}&nbsp;{props.surname}
      </p>
    </div>
  );
};
