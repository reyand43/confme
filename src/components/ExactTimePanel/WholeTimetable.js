import React from 'react'
import Panel from "./ExactTimePanel";


const WholeTimetable = (props) => {

    return(
      <>
        <Panel
          time = {"0:00"}
          event = {"TIME TO BE TOXIC"}
          timeBorder = {"10px 0 0 0"}
          eventBorder = {"0 10px 0 0"}
        />
        <Panel time = {"1:00"} event={props.someEvent}/>
        <Panel time = {"2:00"}/>
        <Panel time = {"3:00"}/>
        <Panel time = {"4:00"}/>
        <Panel time = {"5:00"}/>
        <Panel time = {"6:00"}/>
        <Panel time = {"7:00"}/>
        <Panel time = {"8:00"}/>
        <Panel time = {"9:00"}/>
        <Panel time = {"10:00"}/>
        <Panel time = {"11:00"}/>
        <Panel time = {"12:00"}/>
        <Panel time = {"13:00"}/>
        <Panel time = {"14:00"}/>
        <Panel time = {"15:00"}/>
        <Panel time = {"16:00"}/>
        <Panel time = {"17:00"}/>
        <Panel time = {"18:00"}/>
        <Panel time = {"19:00"}/>
        <Panel time = {"20:00"}/>
        <Panel time = {"21:00"}/>
        <Panel time = {"22:00"}/>
        <Panel
          time = {"23:00"}
          event = {"YEEE I DONT FEEL TO WELL SHITTY"}
          eventBorder = {"0 0 10px 0"}
          timeBorder = {"0 0 0 10px"}
          panelBottom = {"30px"}
        />
      </>
    )
}

export default WholeTimetable;
