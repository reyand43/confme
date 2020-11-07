import React, { Component } from "react";
import classes from "./Sponsors.module.scss";
import { connect } from "react-redux";
import DateCard from "../../../components/Timetable/DateCard/DateCard";
import { changeDate } from "../../../store/actions/timetable";
import EventCard from "../../../components/Timetable/EventCard/EventCard";
import SponsorCard from "../../../components/UI/SponsorCard/SponsorCard";
import { BGMain } from "../../../components/UI/BGMain/BGMain";

class Sponsors extends Component{
  render(){
    return(
      <BGMain>
        <div className={classes.Sponsors}>
          <div className={classes.Sponsors__Title}>
            Спонсоры  
          </div>
          <div className={classes.Sponsors__Grid}>
              <SponsorCard
                // logo = "Логотип"
                title = "Google"
                text = "Классная компания"/>
              <SponsorCard
                // logo = "Логотип"
                title = "Amazon"
                text = "Тоже классная компания"/>
              <SponsorCard
                // logo = "Логотип"
                title = "Apple"
                text = "Прикольная компания"/>
              <SponsorCard
                // logo = "Логотип"
                title = "Facebook"
                text = "Дурацкая компания"/>
              <SponsorCard
                // logo = "Логотип"
                title = "Макшнакнекс"
                text = "Ресторан"/>
              <SponsorCard
                // logo = "Логотип"
                title = "Макдокнак"
                text = "Тоже ресторан"/>
              <SponsorCard
                // logo = "Логотип"
                title = "Ашан"
                text = "Продуктовый гипермаркет"/>
          </div>
        </div>
      </BGMain>

    )
  }
}

export default Sponsors