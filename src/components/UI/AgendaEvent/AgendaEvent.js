import React from "react";
import classes from "./AgendaEvent.module.scss";

const AgendaEvent = (props) => {


  return (
    <div className={classes.AgendaEvent} style={{marginTop: props.marginTop}}>
      {props.activity}
    </div>
  );
};

export default AgendaEvent;
