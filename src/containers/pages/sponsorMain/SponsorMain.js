import React, { Component } from "react";
import classes from "./SponsorMain.module.scss";
import { connect } from "react-redux";
import DateCard from "../../../components/Timetable/DateCard/DateCard";
import { changeDate } from "../../../store/actions/timetable";
import EventCard from "../../../components/Timetable/EventCard/EventCard";
import SponsorCard from "../../../components/UI/SponsorCard/SponsorCard";
import { BGMain } from "../../../components/UI/BGMain/BGMain";
import SponsorMain_Top from "../../../components/UI/SponsorMain_Top/SponsorMain_Top";
import SponsorMain__Representatives from "../../../components/UI/SponsorMain_Representatives/SponsorMain_Representatives";
import Surveys from "../../../components/UI/Surveys/Surveys";
import Presentations from "../../../components/UI/Presentations/Presentations";
import SponsorMain_Materials from "../../../components/UI/SponsorMain_Materials/SponsorMain_Materials";





class SponsorMain extends Component{
  render(){
    return(
      <BGMain>
        <div className={classes.SponsorMain}>

          <SponsorMain_Top
            title = "Google"
            description = "Хорошая компания"
            text = "Американская транснациональная корпорация, реорганизованная 15 октября 2015 года в международный конгломерат Alphabet Inc., компания в составе холдинга Alphabet, инвестирующая в интернет-поиск, облачные вычисления и рекламные технологии."/>   

            <SponsorMain__Representatives/>         
          {/* <div className={classes.SponsorMain__Materials2}>
            <SponsorMain_Surveys/>
            <SponsorMain_Presentations/>
          </div> */}
          <SponsorMain_Materials/>

        </div>
      </BGMain>

    )
  }
}

export default SponsorMain