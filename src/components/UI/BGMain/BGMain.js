import React from 'react'
import classes from './BGMain.module.scss'

export function BGMain(props){
    return(
        <div className={classes.BGMain}>
            <div className={classes.BGMain__Content} >
            {props.children}
            </div>

        </div>
    )
}