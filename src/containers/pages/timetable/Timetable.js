import React, { Component } from "react";
import classes from "./Timetable.module.scss";
import { connect } from "react-redux";
import DateCard from "../../../components/Timetable/DateCard/DateCard";
import { changeDate } from "../../../store/actions/timetable";
import EventCard from "../../../components/Timetable/EventCard/EventCard";
import TimetableCard from "../../../components/UI/TimetableCard/TimetableCard";
import { fetchTimetable } from "../../../store/actions/timetable";
import { Loader } from "../../../components/UI/Loader/Loader";
import { ScrollBar } from "../../../components/UI/ScrollBar/ScrollBar";

class Timetable extends Component {

  state = {
    selectedDay: 0
  };
  

  formatTime(timestamp) {
    const d = new Date(timestamp);
    const time = `${d.getHours()}:${d.getMinutes()}`;
    return time;
  }

  formatDate(timestamp) {
    const d = new Date(timestamp);
    const date = `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`;
    return date;
  }

  

  componentDidMount() {
    this.props.fetchTimetable();

  }

  selectDay(index){
    this.setState({
      selectedDay: index
    })
    
  }

  renderDays() {
    return this.props.days.map((day, index) => {
      
      if (this.state.selectedDay === index) {
      return (
        <button className={classes.Timetable__DayButtons__Selected} onClick={() => this.selectDay(index)} key={index}>
          <span className={classes.Timetable__DayButtons__Title}>
            День {index + 1}
          </span>
          <span className={classes.Timetable__DayButtons__Day}>
            {day}
          </span>
        </button>
      )}
      else{
        return (
          <button onClick={() => this.selectDay(index)} key={index}>
            <span className={classes.Timetable__DayButtons__Title}>
              День {index + 1}
            </span>
            <span className={classes.Timetable__DayButtons__Day}>
              {day}
            </span>
          </button>
        )
      }
    });
  }

  renderStreams() {
    return this.props.streams.map((stream, index) => {
      return (
        <div key={index} className={classes.Timetable__Streams__Background}>
          <div className={classes.Timetable__Streams__Background__Title}>
            <span>Поток {index+1}</span>
          </div>
          <div className={classes.Timetable__Streams__Background__Events}>
          {this.renderEvents(stream)}
          </div>
        </div>
      );
    });
  }

  renderEvents(stream) {
    return this.props.timetable.map((event, index) => {
      
      if (event.stream === stream && this.formatDate(event.startTime)===this.props.days[this.state.selectedDay]){
      return (
        <TimetableCard
        event = {event}
        key={index}
          startTime={this.formatTime(event.startTime)}
          title={event.title}
          text={event.description}
          endTime = {this.formatTime(event.endTime)}
          speakers = {event.speakers}
          cardId = {event.id}
        />
      );
    }}
  )
  }


  render() {
    return (
      <div className={classes.Timetable}>
        {this.props.loading ? (
          <Loader />
        ) : (
          <>
            <div className={classes.Timetable__DayButtons}>
              {this.renderDays()}
            </div>
            <ScrollBar>
            <div className={classes.Timetable__Streams}>
              
              {this.renderStreams()}
              
           
            </div>
            </ScrollBar>
          </>
        )}
       
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    timetable: state.timetable.timetable,
    loading: state.timetable.loading,
    days: state.timetable.days,
    streams: state.timetable.streams,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTimetable: () => dispatch(fetchTimetable()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timetable);
