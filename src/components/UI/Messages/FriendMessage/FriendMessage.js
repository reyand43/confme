import React from "react";
import classes from './FriendMessage.module.scss'
import { UserPhoto } from "../../UserPhoto/UserPhoto";


const FriendMessage = (props) => {
  

    return(
      <div className={classes.FriendMessage}>
          <UserPhoto/>
          <div className={classes.FriendMessage__Data}>
            <div className={classes.FriendMessage__Data__Name}>
              <span>{props.name}{" "}{props.surname}</span>
              </div>
            <div className={classes.FriendMessage__Data__Text}>
            <span>{props.text}</span>
            </div>
            <div className={classes.FriendMessage__Data__Time}>
          <span>{props.time}</span>
          </div>
          </div>
          
          
          </div>
          
          

      
      
    
    )
}

export default FriendMessage