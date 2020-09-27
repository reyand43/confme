import React from "react";
import classes from "./Card.module.scss";

export const Card = (props) => (
  <div className={classes[props.type] || classes.Card}>
    <p>{props.title}</p>
    {props.children}
  </div>
);
