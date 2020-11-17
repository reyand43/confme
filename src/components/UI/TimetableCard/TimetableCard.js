import React, { Component } from "react";
import classes from "./TimetableCard.module.scss";
import {UserPhoto} from '../UserPhoto/UserPhoto';
import { connect } from "react-redux";
import {addToAgenda} from "../../../store/actions/timetable"

class TimetableCard extends Component{
    constructor(props) {
        super(props);
        // this.speakers = this.props.speakers;
        // this.addToAgenda = this.props.addToAgenda.bind(this)
      }


    renderSpeakers = () => { // надо пофиксить
        return (this.props.speakers != null) && this.props.speakers.map((speaker) => {
            return (
              <li key={speaker.id}>
                <UserPhoto/>
                <div className={classes.TimetableCard__Speakers__Info}>
                    <div className={classes.TimetableCard__Speakers__Info__Name}>
                {speaker.name}{" "}{speaker.surname}
                </div>
                <div className={classes.TimetableCard__Speakers__Info__Career}>
                {speaker.career}
                </div>
                </div>
              </li>
            );
          });
    }

    addToAgenda = () => {
        this.props.addToAgenda(this.props.event)
    }// СДЕЛАТЬ ФУНКЦИЮ


    render(){

    return (
        <div className={classes.TimetableCard}>
            <div className={classes.TimetableCard__Top}>
                <span>{this.props.startTime} : {this.props.endTime}</span>
                <button onClick={this.addToAgenda}>Добавить в "Мое расписание"
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


  function mapDispatchToProps(dispatch) {
    return {
      addToAgenda: (event) => dispatch(addToAgenda(event)),
    };
  }

export default connect(null, mapDispatchToProps)(TimetableCard)
