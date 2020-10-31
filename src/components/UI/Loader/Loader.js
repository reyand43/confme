import React from "react";
import classes from "./Loader.module.scss";

export const Loader = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.Loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
