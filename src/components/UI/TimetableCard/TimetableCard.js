import React, { Component } from "react";
import classes from "./TimetableCard.module.scss";


class TimetableCard extends Component{
    constructor(props) {
        super(props);
        this.speakers = this.props.speakers;
      }


    renderSpeakers = () => { // надо пофиксить
        return (this.speakers != null) && this.speakers.map((speaker) => {
            return (
              <li key={speaker.id}>
                {speaker.name}{" "}{speaker.surname}
                {speaker.company}{", "}{speaker.city}
              </li>
            );
          });
    }



    render(){

    return (
        <div className={classes.TimetableCard}>
            <div className={classes.TimetableCard__Top}>
                <span>{this.props.time}</span>
                <button>Добавить в "Мое расписание"
                <i className="fa fa-calendar fa-lg" aria-hidden="true"></i>
                </button>
            </div>
            <div className={classes.TimetableCard__Title}>
                {this.props.title}
            </div>
            <div className={classes.TimetableCard__Text}>
                {this.props.text}
            </div>
            <div className={classes.TimetableCard__Speakers}>
                <span>
                    Спикеры
                </span>
                <ul> {/* ненумерованный список */}
                    {this.renderSpeakers()}
                </ul>

            </div>
            <button className={classes.TimetableCard__ButtonWatch}>
                Смотреть трансляцию
            </button>
        </div>
    )
}}

export default TimetableCard
