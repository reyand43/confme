import React from 'react'
import classes from './BGSide.module.scss'

export function BGSide(props){
    return(
        <div className={classes.BGSide}>
            <div className={classes.BGSide__Content} >
            {props.children}

            </div>

        </div>
    )
}