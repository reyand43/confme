import React from 'react';
import classes from './RoleSearchListItem.module.scss'

export function RoleSearchListItem(props){
    
    const cls = [classes.RoleSearchListItem, classes[props.selected]];
    if (props.selected===true){
        cls.push(classes.selected)
    }
    return(
        <div className={cls.join(" ")}>
            <span>{props.label}</span>
        </div>
    )

}