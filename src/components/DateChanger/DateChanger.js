import React from 'react'
import classes from './DateChanger.module.scss';


let newDate = new Date();
let date = newDate.getDate();
let month = newDate.getMonth() + 1;
let year = newDate.getFullYear();
let tomorrow = new Date();
let yesterday = new Date();

class DateChanger extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: date,
      month: month,
      year: year,
      showingDate: `${date}${' '}${this.getMonthName(month)}${' '}${year}`
    };
    this.getNextDate = this.getNextDate.bind(this);
    this.getPrevDate = this.getPrevDate.bind(this);
  }

  getMonthName(month){
    let monthName;
    switch(month){
          case 1: monthName = "Января";
              break;
          case 2: monthName = "Февраля";
              break;
          case 3: monthName = "Марта";
              break;
          case 4: monthName = "Апреля";
              break;
          case 5: monthName = "Мая";
              break;
          case 6: monthName = "Июня";
              break;
          case 7: monthName = "Июля";
              break;
          case 8: monthName = "Августа";
              break;
          case 9: monthName = "Сентября";
              break;
          case 10: monthName = "Октября";
              break;
          case 11: monthName = "Ноября";
              break;
          case 12: monthName = "Декабря";
              break;
          }
    return monthName;
  }

  getNextDate() {
    tomorrow.setTime(tomorrow.getTime() + 1000*60*60*24)
    date = tomorrow.getDate();
    month = tomorrow.getMonth() + 1;
    year = tomorrow.getFullYear();
    this.setState({
      date,
      month,
      year,
      showingDate: `${date}${' '}${this.getMonthName(month)}${' '}${year}`
    });
  }

  getPrevDate() {
    yesterday.setTime(yesterday.getTime() - 1000*60*60*24)
    date = yesterday.getDate();
    month = yesterday.getMonth() + 1;
    year = yesterday.getFullYear();
    this.setState({
      date,
      month,
      year,
      showingDate: `${date}${' '}${this.getMonthName(month)}${' '}${year}`
    });
  }

  render(){
    return(
        <div className = {classes.DateChanger}>
          <div className={classes.Row}>
            <div className={classes.column}>
              <button onClick={this.getPrevDate}><i class="fa fa-chevron-left" aria-hidden="true"/></button>
            </div>
            <div className={classes.column}>
              <div className={classes.img}>
                <i class="fa fa-calendar" aria-hidden="true"></i>
              </div>
            </div>
            <div className={classes.column}>
              <div className={classes.date}>
                {this.state.showingDate}
              </div>
            </div>
            <div className={classes.column}>
            <button onClick={this.getNextDate}><i class="fa fa-chevron-right" aria-hidden="true"/></button>
            </div>
          </div>
        </div>
    )
  }
}

export default DateChanger;
