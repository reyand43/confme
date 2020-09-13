import React from "react";
import { Redirect } from "react-router-dom";
import { Button } from "../Button/Button";
import classes from "./DropDown.module.scss";

const DropDown = (props) => {
  const cls = [classes.DropDownContent, classes[props.styles]]

  return (
    <div className={classes.DropDown}>
      <div className={classes.DropDownButton} onClick = {props.onClick}>{props.children}</div>
      <div className={cls.join(" ")}>
        <ul>
          {props.items.map((item, index) => {
            return <li key={index}>
                <Button type = "dropDownButton" onClick = {item.onClick}>{item.text}</Button>
            </li>;
          })}
        </ul>
      </div>
      {props.state ? <Redirect to="/editProfile"/> : null}
    </div>
  );
};

export default DropDown;
