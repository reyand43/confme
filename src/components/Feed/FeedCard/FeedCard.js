import classes from './FeedCard.module.css'
import React from 'react'
import UserItem from '../../UI/UserItem/UserItem'

const FeedCard = props => {


    return(
        <div className = {classes.FeedCard}>
            <div className = {classes.FeedCardHead}>
                <UserItem/>
            </div>
        </div>
    )
}

export default FeedCard