import React from "react";
import classes from "./DateCard.module.scss";

const DateCard = (props) => {
  const cls = [
    classes.DateBox
  ]
  if(props.isActive){
    cls.push(classes.active)
  }
  return (
    <div className={cls.join(' ')} onClick={props.onClick}>
      <p>Дата: {props.date}</p>
      <p>Время: {props.time}</p>
    </div>
  );
};

export default DateCard;
