import React from "react";
import classes from './FriendMessage.module.scss'
import { UserPhoto } from "../../UserPhoto/UserPhoto";
import { NavLink } from "react-router-dom";

const FriendMessage = (props) => {
  

    return(
      <div className={classes.FriendMessage}>
          <UserPhoto/>
          <div>
          <NavLink to={"/"}>{props.name}&nbsp;{props.surname}<span>{props.time}</span></NavLink>

          <p>{props.text}</p>
          </div>
          

      </div>
      
    
    )
}

export default FriendMessage