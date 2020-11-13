import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
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
            <NavLink to="/sponsorMain" activeClassName={classes.active}>
              <SponsorCard
              logo = "Логотип"
              title = "Google"
              description = "Классная компания"/>
            </NavLink>
              <SponsorCard
                // logo = "Логотип"
                title = "Amazon"
                description = "Тоже классная компания"/>
              <SponsorCard
                // logo = "Логотип"
                title = "Apple"
                description = "Прикольная компания"/>
              <SponsorCard
                // logo = "Логотип"
                title = "Facebook"
                description = "Дурацкая компания"/>
              <SponsorCard
                // logo = "Логотип"
                title = "Макшнакнекс"
                description = "Ресторан"/>
              <SponsorCard
                // logo = "Логотип"
                title = "Макдокнак"
                description = "Тоже ресторан"/>
              <SponsorCard
                // logo = "Логотип"
                title = "Ашан"
                description = "Продуктовый гипермаркет"/>
          </div>
        </div>
      </BGMain>

    )
  }
}

export default Sponsors