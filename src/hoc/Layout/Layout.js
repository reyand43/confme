import React, { Component } from "react";
import classes from "./Layout.module.scss";

class Layout extends Component {
  render() {
    return (
      
      <div className={classes.Layout}>
        {this.props.navbar}
        <div className={classes.vertical}>
        {this.props.children}
        </div>
      </div>
      
    );
  }
}

export default Layout;
