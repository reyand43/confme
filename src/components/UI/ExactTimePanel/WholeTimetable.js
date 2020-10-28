import React from 'react'
import Panel from "./ExactTimePanel";

const WholeTimetable = (props) => {

    return(
      <div>
        <Panel
          time = {"0:00"}
          event = {"TIME TO BE TOXIC"}
          timeBorder = {"10px 0 0 0"}
          eventBorder = {"0 10px 0 0"}
        />
        <Panel time = {"1:00"} event = {""}/><Panel time = {"2:00"} event = {""}/><Panel time = {"3:00"} event = {""}/><Panel time = {"4:00"} event = {""}/><Panel time = {"5:00"} event = {""}/><Panel time = {"6:00"} event = {""}/><Panel time = {"7:00"} event = {""}/><Panel time = {"8:00"} event = {""}/><Panel time = {"9:00"} event = {""}/><Panel time = {"10:00"} event = {""}/><Panel time = {"11:00"} event = {""}/><Panel time = {"12:00"} event = {""}/><Panel time = {"13:00"} event = {""}/><Panel time = {"14:00"} event = {""}/><Panel time = {"15:00"} event = {""}/><Panel time = {"16:00"} event = {""}/><Panel time = {"17:00"} event = {""}/><Panel time = {"18:00"} event = {""}/><Panel time = {"19:00"} event = {""}/><Panel time = {"20:00"} event = {""}/><Panel time = {"21:00"} event = {""}/><Panel time = {"22:00"} event = {""}/>
        <Panel
          time = {"23:00"}
          event = {"YEEE I DONT FEEL TO WELL SHITTY"}
          eventBorder = {"0 0 10px 0"}
          timeBorder = {"0 0 0 10px"}
          panelBottom = {"30px"}
        />
      </div>
    )
}

export default WholeTimetable;
