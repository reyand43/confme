import React from "react";
import classes from "./agenda.module.scss";
import axios from "../../../axios/axios";
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
                {/*
                  Начиная с 8 утра: 42px, за каждый следующий час +54px: 42, 96, 150, 204, ...
                */}
                <AgendaEvent top={"420px"} time={"15:00-17:00"} duration={"2 часа 0 минут"} theme={"ТЕМА ВСТРЕЧЕ НЕ ОБЪЯВЛЕН"} speakers={"РАНДОМ КАКОЙ-ТА"}/>
                <AgendaEvent top={"663px"} time={"19:30-20:30"} duration={"2 часа 0 минут"} theme={"ТЕМА ВСТРЕЧЕ НЕ ОБЪЯВЛЕН"} speakers={"РАНДОМ КАКОЙ-ТА"}/>
                <AgendaEvent top={"231px"} time={"11:30-13:00"} duration={"1 часа 30 минут"} height={"77.75px"} theme={"ТЕМА ВСТРЕЧЕ НЕ ОБЪЯВЛЕН"} speakers={"РАНДОМ КАКОЙ-ТА"}/>
                <WholeTimetable/>
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
