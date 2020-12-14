import React from "react";
import classes from "./Agenda.module.scss";
import { connect } from "react-redux";
import { BGMain } from "../../../components/UI/BGMain/BGMain";
import WholeTimetable from "../../../components/ExactTimePanel/WholeTimetable";
import AgendaEvent from "../../../components/UI/AgendaEvent/AgendaEvent";
import { ScrollBar } from "../../../components/UI/ScrollBar/ScrollBar";
import { fetchAgendaEvents } from "../../../store/actions/agenda";
import { Loader } from "../../../components/UI/Loader/Loader";

//---

let newDate = new Date();
let date = newDate.getDate();
let month = newDate.getMonth() + 1;
let year = newDate.getFullYear();

class Agenda extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: date,
      month: month,
      year: year,
      showingDate: `${date}${" "}${this.getMonthName(month)}${" "}${year}`,
    };
    this.getNextDate = this.getNextDate.bind(this);
    this.getPrevDate = this.getPrevDate.bind(this);
    this.timelineRef = React.createRef();
  }

  componentDidMount() {
    let userId = localStorage.getItem("userId");
    this.props.fetchAgendaEvents(userId);
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if(!!document.getElementById("line"))
    this.timelineRef.scrollIntoView({ block: "start", behavior: "auto" });
  };

  renderEvents() {
    return this.props.agendaEvents.map((event, index) => {
      const d = new Date(event.startTime);
      const startTime = (d.getHours() - 8) * 60 + d.getMinutes();

      if (d.getDate() === newDate.getDate())
        return (
          <AgendaEvent
            key={index}
            timeStart={this.formatTime(event.startTime)}
            timeEnd={this.formatTime(event.endTime)}
            theme={event.title}
            height={Math.floor((event.endTime - event.startTime) / 1000 / 60)}
            top={startTime + 15}
            eventId={event.id}
          />
        );
    });
  }

  formatTime(timestamp) {
    const d = new Date(timestamp);
    const time =
      ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    return time;
  }

  getMonthName(month) {
    let monthName;
    switch (month) {
      case 1:
        monthName = "Января";
        break;
      case 2:
        monthName = "Февраля";
        break;
      case 3:
        monthName = "Марта";
        break;
      case 4:
        monthName = "Апреля";
        break;
      case 5:
        monthName = "Мая";
        break;
      case 6:
        monthName = "Июня";
        break;
      case 7:
        monthName = "Июля";
        break;
      case 8:
        monthName = "Августа";
        break;
      case 9:
        monthName = "Сентября";
        break;
      case 10:
        monthName = "Октября";
        break;
      case 11:
        monthName = "Ноября";
        break;
      case 12:
        monthName = "Декабря";
        break;
    }
    return monthName;
  }

  getNextDate() {
    newDate.setTime(newDate.getTime() + 1000 * 60 * 60 * 24);
    date = newDate.getDate();
    month = newDate.getMonth() + 1;
    year = newDate.getFullYear();
    this.setState({
      date,
      month,
      year,
      showingDate: `${date}${" "}${this.getMonthName(month)}${" "}${year}`,
    });
  }

  getPrevDate() {
    newDate.setTime(newDate.getTime() - 1000 * 60 * 60 * 24);
    date = newDate.getDate();
    month = newDate.getMonth() + 1;
    year = newDate.getFullYear();
    this.setState({
      date,
      month,
      year,
      showingDate: `${date}${" "}${this.getMonthName(month)}${" "}${year}`,
    });
  }

  render() {
    let DateChanger = (
      <div className={classes.Agenda__DateChanger}>
        <i
          onClick={this.getPrevDate}
          className="fa fa-chevron-left"
          aria-hidden="true"
        />
        <div className={classes.img}>
          <i className="fa fa-calendar" aria-hidden="true"></i>
        </div>
        <div className={classes.date}>{this.state.showingDate}</div>

        <i
          onClick={this.getNextDate}
          className="fa fa-chevron-right"
          aria-hidden="true"
        />
      </div>
    );
    var now = new Date();
    const offset = (now.getHours() - 8) * 60 + now.getMinutes() - 9;
    let opacity
    if (now.getDate() === newDate.getDate()){
      opacity=100
    }
    else opacity=0
    return (
      <BGMain>
        <div className={classes.Agenda}>
          {DateChanger}

          <WholeTimetable>
            {now.getDate() === newDate.getDate() && (
              <hr
              id="line"
                ref={(timeline) => {
                  this.timelineRef = timeline;
                }}
                className={classes.Agenda__ExactTimeline}
                style={{ top: `${offset}px`, opacity: {opacity}}}
              />
            )}
            {this.props.agendaEventsLoading ? <Loader /> : this.renderEvents()}
          </WholeTimetable>
        </div>
      </BGMain>
    );
  }
}

function mapStateToProps(state) {
  return {
    agendaEvents: state.agenda.agendaEvents,
    agendaEventsLoading: state.agenda.agendaEventsLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAgendaEvents: (userId) => dispatch(fetchAgendaEvents(userId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Agenda);
