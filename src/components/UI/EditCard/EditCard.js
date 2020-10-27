import React from "react";
import classes from "./EditCard.module.scss";

const EditCard = (props) => {
  const cls = [
    classes.EditBox
  ]
  if(props.isActive){
    cls.push(classes.active)
  }
  return (
    <div className={cls.join(' ')} onClick={props.onClick}>
      <div style={{paddingTop:"13px", textAlign:"left", paddingLeft: "3px"}}> {props.editor} </div>
    </div>
  );
};

export default EditCard;
