import React from 'react'
import classes from './EventCard.module.scss';

const EventCard = (props) => {

    return(
        <div className = {classes.EventCard}>
            <div className = {classes.EventCardLabels}>
                <h1>{props.title}</h1>
                <p>{props.description}</p>
                <p>{props.time}</p>
            </div>
            <i className="fa fa-star-o" aria-hidden="true"></i>
        </div>
    )
}

export default EventCard;