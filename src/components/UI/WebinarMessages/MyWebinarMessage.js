import React from 'react'
import classes from './MyWebinarMessage.module.scss'

export const MyWebinarMessage = (props) => {
    return(
        <div className={classes.MyWebinarMessage}>
            <div className={classes.MyWebinarMessage__Time}>
                <span>{props.Time}</span>
            </div>
            <div className={classes.MyWebinarMessage__Text}>
                {props.Text}
            </div>
        </div>
    )
}