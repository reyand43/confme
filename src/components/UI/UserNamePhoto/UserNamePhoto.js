import React from 'react'
import { UserPhoto } from '../UserPhoto/UserPhoto'
import { UserName } from '../UserName/UserName'
import classes from './UserNamePhoto.module.scss'


export const UserNamePhoto = () => {
return(
    <div className={classes.UserNamePhoto}>
        <div className={classes.child}>
    <UserName/>
    </div>
    <div className={classes.child}>
    <UserPhoto/>
    </div>
    </div>
)

}