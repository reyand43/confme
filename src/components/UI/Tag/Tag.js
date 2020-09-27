import React from 'react'
import classes from './Tag.module.scss'



export const Tag = (props) => {
    return(
        <div className={classes.Tag}>
           <span>{props.text}</span>
           {!!props.deleted && <i className="fa fa-times" aria-hidden="true"></i>}
        </div>
    )

}