import React from 'react'
import classes from './UserItem.module.scss'
import { UserPhoto } from '../UserPhoto/UserPhoto'


export const UserItem = (props) => {
    return(
        <div className={classes.UserItem}>
            <UserPhoto size={'md'}/>
            <div className={classes.UserItem__UserInfo}>
            <p >{props.name}&nbsp;{props.surname}</p>
            <p>26 лет</p>
            <p>СТО в компании EPAM</p>
             </div>
             </div>
    )

}