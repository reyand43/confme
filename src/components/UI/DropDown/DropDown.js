import React from "react";
import { Redirect } from "react-router-dom";
import classes from "./DropDown.module.scss";
import "../vars.scss";

const DropDown = (props) => {
  const cls = [classes.DropDownContent, classes[props.styles], classes.unselectable]

  return (
    <div className={classes.DropDown}>
      <div className={classes.DropDownButton} onClick = {props.onClick}>{props.children}</div>
      <div className={cls.join(" ")}>
        <ul>
          {props.items.map((item, index) => {
            return <li key={index}>
                <p onClick = {item.onClick}>{item.text}</p>
            </li>;
          })}
        </ul>
      </div>
      {props.state ? <Redirect to="/editProfile"/> : null}
    </div>
  );
};

export default DropDown;
