import React from "react";
import classes from './MyMessage.module.scss'


const MyMessage = (props) => {
  

    return(
      <div className={classes.MyMessage}>
          
          <div className={classes.MyMessage__Data}>
            <div className={classes.MyMessage__Data__Text}>
            <span>{props.text}</span>
          </div>
          <div className={classes.MyMessage__Data__Time}>
          <span>{props.time}</span>
          </div>
          
          </div>
          
          

      </div>
      
    
    )
}

export default MyMessage