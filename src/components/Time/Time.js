import classes from "./Time.module.scss";
import React from "react";

class Time extends React.Component {

    state = {
        time: null
    } 

  componentDidMount() {
    
    this.intervalTime = setInterval(() => {
      let currentTime = new Date();
      let h = currentTime.getUTCHours() + this.props.utc;
      let m = currentTime.getUTCMinutes();
      let s = currentTime.getUTCSeconds();
      if(h < 10) h = '0' + h;
      if(m < 10) m = '0' + m;
      if(s < 10) s = '0' + s;
      let UTCTime =
        h + ":" + m + ":" + s;
      this.setState({
        time: UTCTime,
      });
    });
  }

  componentWillUnmount() {
    clearInterval(this.intervalTime);
  }

  render() {
    return <div className={classes.Time}>
        {this.state.time} | {this.props.city}
    </div>;
  }
}

export default Time;
