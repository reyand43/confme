import React from "react";
import classes from './MyMessage.module.scss'
import { UserPhoto } from "../../UserPhoto/UserPhoto";
import { NavLink } from "react-router-dom";

const MyMessage = (props) => {
  

    return(
      <div className={classes.MyMessage}>
          
          <div>
          <NavLink to={"/"}>{props.name}&nbsp;{props.surname}</NavLink>
          <p>{props.text}</p>
          </div>
          <UserPhoto/>
          

      </div>
      
    
    )
}

export default MyMessage