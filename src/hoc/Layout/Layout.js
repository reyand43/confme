import React, { Component } from "react";
import classes from "./Layout.module.scss";

class Layout extends Component {
  render() {
    return (
      
      <div className={classes.Layout}>
        <div className={classes.Layout__Sidebar}>
        {this.props.sidebar}
        </div>
        {this.props.children}
        </div>
      
      
    );
  }
}

export default Layout;
