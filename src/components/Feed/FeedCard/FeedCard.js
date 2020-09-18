import classes from './FeedCard.module.css'
import React from 'react'
import UserItem from '../../UI/UserItem/UserItem'

const FeedCard = props => {


    return(
        <div className = {classes.FeedCard}>
            <div className = {classes.FeedCardHead}>
                <UserItem/>
            </div>
            <div className = {classes.FeedCardContent}>

            </div>
            <hr/>
            <div className = {classes.FeedCardLowMenu}></div>
        </div>
    )
}

export default FeedCard