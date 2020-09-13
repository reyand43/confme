import React from "react";
import classes from "./MainView.module.scss";

class MainView extends React.Component {
  render() {
    return <div className={classes.MainView}>{this.props.children}</div>;
  }
}


export default MainView;
