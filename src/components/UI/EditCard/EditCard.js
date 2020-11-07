import React from "react";
import classes from "./EditCard.module.scss";

const EditCard = (props) => {
  
  return (
    <div className={classes.EditCard}>
      <div className={classes.EditCard__Title}> {props.title} </div>
      <div className={classes.EditCard__Content}>
        {props.children}
      </div>
    </div>
  );
};

export default EditCard;
