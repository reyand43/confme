import React, { Component } from "react";
import classes from "./TimetableCard.module.scss";
import { UserPhoto } from "../UserPhoto/UserPhoto";
import { connect } from "react-redux";
import { addToAgenda, removeFromAgenda} from "../../../store/actions/timetable";
import { NavLink } from "react-router-dom";
import { Loader } from "../Loader/Loader";

class TimetableCard extends Component {
  constructor(props) {
    super(props);
    // this.speakers = this.props.speakers;
    // this.addToAgenda = this.props.addToAgenda.bind(this)
  }

  renderSpeakers = () => {
    // надо пофиксить
    return (
      this.props.speakers != null &&
      this.props.speakers.map((speaker) => {
        return (
          <li key={speaker.id}>
            <UserPhoto />
            <div className={classes.TimetableCard__Speakers__Info}>
              <div className={classes.TimetableCard__Speakers__Info__Name}>
                {speaker.name} {speaker.surname}
              </div>
              <div className={classes.TimetableCard__Speakers__Info__Career}>
                {speaker.career}
              </div>
            </div>
          </li>
        );
      })
    );
  };

 clickHandler = () => {
     if(this.props.added){
        this.props.removeFromAgenda(this.props.event.id);
     }
     else{
        this.props.addToAgenda(this.props.event);
     }
    
  }; // СДЕЛАТЬ ФУНКЦИЮ

  render() {
    return (
      <div className={classes.TimetableCard}>
        <div className={classes.TimetableCard__Top}>
          <span>
            {this.props.startTime} : {this.props.endTime}
          </span>
          {this.props.added ? (
            <button onClick={this.clickHandler} className={classes.TimetableCard__Top__ActiveButton}>
              Добавлено в "Мое расписание"
              <i className="fa fa-check fa-lg" aria-hidden="true"></i>
            </button>
          ) : (
            <button onClick={this.clickHandler} className={classes.TimetableCard__Top__DisableButton}>
              Добавить в "Мое расписание"
              <i className="fa fa-plus fa-lg" aria-hidden="true"></i>
            </button>
          )}
        </div>
        <div className={classes.TimetableCard__Title}>{this.props.title}</div>
        <div className={classes.TimetableCard__Text}>{this.props.text}</div>
        <div className={classes.TimetableCard__Speakers}>
          {/* <span>Спикеры</span> */}
          <ul>
            {" "}
            {/* ненумерованный список */}
            {this.renderSpeakers()}
          </ul>
        </div>
        <NavLink to={"/webinar/" + this.props.cardId}>
          <button className={classes.TimetableCard__ButtonWatch}>
            Смотреть трансляцию
          </button>
        </NavLink>
      </div>
    );
  }
}

function mapStateToProps(state){
    return{
        timetable: state.timetable.timetable,
        addLoading: state.timetable.addLoading,
        removeLoading: state.timetable.removeLoading
    }
}

function mapDispatchToProps(dispatch) {
  return {
    addToAgenda: (event) => dispatch(addToAgenda(event)),
    removeFromAgenda: (eventId) => dispatch(removeFromAgenda(eventId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimetableCard);
