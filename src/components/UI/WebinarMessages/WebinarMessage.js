import React from 'react'
import classes from './WebinarMessage.module.scss'
import {UserPhoto} from '../UserPhoto/UserPhoto'
import { NavLink } from 'react-router-dom'

export const WebinarMessage = (props) => {
    return(
        <div className={classes.WebinarMessage}>
            <UserPhoto size="sm"/>
            
            <div className={classes.WebinarMessage__Message}>
            <span className={classes.WebinarMessage__Message__Name}>{props.Name}&nbsp;{props.Surname}</span>
            <div className={classes.WebinarMessage__Message__Text}>
                {props.Text}
            </div>
            </div>
            <div className={classes.WebinarMessage__Time}>
                <span>{props.Time}</span>
            </div>
        </div>
    )
}