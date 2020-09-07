import React from 'react'
import classes from './EventCard.module.scss';

const EventCard = (props) => {

    return(
        <div className = {classes.EventCard}>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
            <p>{props.time}</p>
        </div>
    )
}

export default EventCard;