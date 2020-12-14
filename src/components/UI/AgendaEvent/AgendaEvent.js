import React from "react";
import classes from "./AgendaEvent.module.scss";
import { UserPhoto } from "./../UserPhoto/UserPhoto";
import { ScrollBar } from "../ScrollBar/ScrollBar";
import { NavLink } from "react-router-dom";

const AgendaEvent = (props) => {
  console.log('|||', props)

  return (
    <div className={classes.AgendaEvent} style={{top: props.top, height: props.height}}>
      <ScrollBar>
        
        <div className={classes.AgendaEvent__Content}>
          <div className={classes.AgendaEvent__Content__Theme}>
            <span><b>Тема:</b></span>
            <span>{props.theme}</span>
          </div>
          <div className={classes.AgendaEvent__Content__Speakers}>
            <span><b>Спикеры:</b></span>
            <div className={classes.AgendaEvent__Content__Speakers__List}>
              <div className={classes.AgendaEvent__Content__Speakers__List__Item}>
                <UserPhoto size="sm"/>
                <span>Андрей<br/> Бабушкин</span>
              </div>
              <div className={classes.AgendaEvent__Content__Speakers__List__Item}>
                <UserPhoto size="sm"/>
                <span>Лариса<br/> Каримова</span>
              </div>
              <div className={classes.AgendaEvent__Content__Speakers__List__Item}>
                <UserPhoto size="sm"/>
                <span>Владислав<br/> Жаворонков</span>
              </div>
            </div>
          </div>
          <div className={classes.AgendaEvent__Content__AttendButton}>
          <NavLink to={"/webinar/"+ props.eventId}><button>Присоединиться</button></NavLink>
          </div>
        </div>
       
      </ScrollBar>
    </div>
  );
};

export default AgendaEvent;
