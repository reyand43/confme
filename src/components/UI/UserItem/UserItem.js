import React from "react";
import classes from "./UserItem.module.scss";
import { UserPhoto } from "../UserPhoto/UserPhoto";
import { NavLink, Link } from "react-router-dom";

export const UserItem = (props) => {
    const cls = [classes.UserItem];

    if(props.clicked) {
        cls.push(classes.clicked)
    }
    

    return(
        <div  className={cls.join(" ")}>
            <UserPhoto size={'lg'}/>
            <div className={classes.UserItem__Text}>
            <div className={classes.UserItem__Text__Info}>
            <span className={classes.UserItem__Text__Info__Name}>{props.name}&nbsp;{props.surname}</span>
            <span className={classes.UserItem__Text__Info__Career}>{props.profession}</span>
            <span className={classes.UserItem__Text__Info__Career}>{props.accountType}</span>
            </div>
            
            <Link to={{
                    pathname:"/dialogs/"+ props.dialogId,
                    state: {friendId: props.id}
                    }
                }><span>Написать сообщение</span></Link>
             </div>
             </div>
             
    )

}

