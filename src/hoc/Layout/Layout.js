import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Layout.module.scss";
import {fetchUsers} from '../../store/actions/users'

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

function mapDispatchToProps(dispatch) {
  return{
    fetchUsers: () => dispatch(fetchUsers()),
  }
}

export default connect(null, mapDispatchToProps)(Layout)
