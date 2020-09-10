import React, { Component } from "react";
import classes from "./Timetable.module.scss";
import { connect } from "react-redux";
import DateCard from "../../../components/Timetable/DateCard/DateCard";
import { changeDate } from "../../../store/actions/timetable";
import EventCard from "../../../components/Timetable/EventCard/EventCard";

class Timetable extends Component {
  onClick(id) {
    this.props.changeDate(id);
  }


  render() {
    let current = this.props.activeDate;
    //Массив расписаний, где каждый элемент JSX объект который надо отобразить

    //-----------------------------------
    const eventCard1 = (
      <div>
        <EventCard title = 'День 1. Знакомство' description = 'Встречаемся в холе на 2 этаже' time = '11:00 - 12:00'/> 
        <EventCard title = 'День 1. Выступление спикера' description = 'Спикер выступает' time = '12:00 - 14:00'/> 
        <EventCard title = 'День 1. Обед' description = 'Кушаем еду' time = '14:00 - 15:00'/>
      </div>
    );
    //-----------------------------------
    const eventCard2 = (
      <div>
        <EventCard title = 'День 2. Знакомство' description = 'Встречаемся в холе на 2 этаже' time = '11:00 - 12:00'/> 
        <EventCard title = 'День 2. Выступление спикера' description = 'Спикер выступает' time = '12:00 - 14:00'/> 
        <EventCard title = 'День 2. Обед' description = 'Кушаем еду' time = '14:00 - 15:00'/>
      </div>
    );
    //-----------------------------------
    const eventCard3 = (
      <div>
        <EventCard title = 'День 3. Знакомство' description = 'Встречаемся в холе на 2 этаже' time = '11:00 - 12:00'/> 
        <EventCard title = 'День 3. Выступление спикера' description = 'Спикер выступает' time = '12:00 - 14:00'/> 
        <EventCard title = 'День 3. Обед' description = 'Кушаем еду' time = '14:00 - 15:00'/>
      </div>
    );
    //-----------------------------------
    const plans = [eventCard1, eventCard2, eventCard3];

    return (
      <div className={classes.Timetable}>
        <h1>Расписание</h1>
        <div className={classes.DateRow}>
          <DateCard
            time={"11:00 - 22:00"}
            date={"15 сентября"}
            isActive={this.props.activeDate === 0}
            onClick={() => this.onClick(0)}
          />
          <DateCard
            time={"11:00 - 22:00"}
            date={"16 сентября"}
            isActive={this.props.activeDate === 1}
            onClick={() => this.onClick(1)}
          />
          <DateCard
            time={"11:00 - 22:00"}
            date={"17 сентября"}
            isActive={this.props.activeDate === 2}
            onClick={() => this.onClick(2)}
          />
        </div>
        <div className = {classes.EventColumn}>{plans[current]}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeDate: state.timetable.activeDate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeDate: (activeDate) => {
      dispatch(changeDate(activeDate));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timetable);
