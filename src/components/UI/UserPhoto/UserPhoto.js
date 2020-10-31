import React from "react";
import classes from "./UserPhoto.module.scss";

export const UserPhoto = (props) => {
<<<<<<< HEAD
  const cls = [classes.UserPhoto, classes[props.size]];
  return <div className={cls.join(" ")}>
    {props.children}
    </div>;
=======
  const cls = [classes.UserPhoto, classes[props.size], classes[props.rounded]];
  return <div className={cls.join(" ")} />;
>>>>>>> master
};
