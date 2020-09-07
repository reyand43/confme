import React from "react";
import classes from "./Logo.module.css";

export const Logo = (props) => (
  <div className={classes.Logo}>
    {props.isOpen === true ? <h1>Conf.Me</h1> : <h1>C</h1>}
  </div>
);
