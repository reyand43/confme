import React from 'react'
import classes from './BGSide.module.scss'

export function BGSide(props){
    const cls = [
        classes.BGSide,
        
      ]
    if (props.padding === true){
        cls.push(classes.padding)
    }
    if (props.wide === true){
        cls.push(classes.wide)
    }
    return(
        <div className={cls.join(' ')}>
            <div className={classes.BGSide__Content} >
            {props.children}

            </div>

        </div>
    )
}