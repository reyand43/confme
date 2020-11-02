import React from "react";
import classes from "./agenda.module.scss";
import axios from "../../../axios/axios";
import { Card } from "../../../components/UI/Card/Card";
import { connect } from "react-redux";
import {
  changeValue,
  changeEditor
} from "../../../store/actions/editProfile";
import { UserItem } from "../../../components/UI/UserItem/UserItem";
import { UserPhoto } from "../../../components/UI/UserPhoto/UserPhoto";
import { BGMain } from "../../../components/UI/BGMain/BGMain";
import { BGSide } from "../../../components/UI/BGSide/BGSide";
import { Scrollbars } from 'react-custom-scrollbars'
import WholeTimetable from "../../../components/ExactTimePanel/WholeTimetable";
import DateChanger from "../../../components/DateChanger/DateChanger";
import AgendaEvent from "../../../components/UI/AgendaEvent/AgendaEvent";

class Agenda extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {

    return (
        <div className={classes.Agenda}>
          <BGMain>
            <Scrollbars>
                <DateChanger />
                <AgendaEvent marginTop={"378px"} time={"15:00-17:00"} duration={"1 час 30 минут"} theme={"ТЕМА ВСТРЕЧЕ НЕ ОБЪЯВЛЕН"} speakers={"РАНДОМ КАКОЙ-ТА"}/>
                <AgendaEvent marginTop={"188px"} time={"10:30-12:00"} duration={"1 час 30 минут"} theme={"ТЕМА ВСТРЕЧЕ НЕ ОБЪЯВЛЕН"} speakers={"РАНДОМ КАКОЙ-ТА"}/>
                <WholeTimetable />
            </Scrollbars>
          </BGMain>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Agenda);
