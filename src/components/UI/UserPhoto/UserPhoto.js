import React from 'react'
import classes from './UserPhoto.module.scss'

export const UserPhoto = (props) => {
    const cls = [
        classes.UserPhoto,
        classes[props.size]
      ]
    return(
        
          
            <div className={cls.join(' ')}/>
        


    )
}