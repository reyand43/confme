import React from "react";
import classes from "./UserItem.module.scss";
import { UserPhoto } from "../UserPhoto/UserPhoto";
import { NavLink } from "react-router-dom";

export const UserItem = (props) => {
    const cls = [classes.UserItem];

    if(props.id === props.clicked) {
        cls.push(classes.clicked)
    }
    console.log(props)

    return(
        <div  className={cls.join(" ")}>
            <UserPhoto size={'lg'}/>
            <div className={classes.UserItem__Text}>
            <div className={classes.UserItem__Text__Info}>
            <span className={classes.UserItem__Text__Info__Name}>{props.name}&nbsp;{props.surname}</span>
            <span className={classes.UserItem__Text__Info__Career}>СТО в компании EPAM</span>
            <span className={classes.UserItem__Text__Info__Career}>{props.accountType}</span>
            </div>
            
            <NavLink to={"/dialogs/"+ props.id}><span>Написать сообщение</span></NavLink>
             </div>
             </div>
             
    )

}

