import React from 'react'
import { UserPhoto } from '../UserPhoto/UserPhoto'
import classes from './DialogListItem.module.scss'

export const DialogListItem = (props) => {
    return(
        <div className={classes.DialogListItem}>
            <UserPhoto/>
            <div className={classes.MessageInfo}>
                <div className={classes.MessageName}>
                    {props.name}&nbsp;{props.surname}
                    <span>{props.time}</span>
                    </div>
                
                <div className={classes.MessageText}>
                    {props.text}
                </div>

            </div>
            
        </div>
       
    )
}