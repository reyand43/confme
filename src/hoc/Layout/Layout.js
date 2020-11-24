import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchDialogs } from "../../store/actions/dialogList";
import { fetchUsers } from "../../store/actions/users";
import classes from "./Layout.module.scss";

class Layout extends Component {
  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchDialogs(localStorage.getItem("userId"));
  }
  render() {
    return (
      <div className={classes.Layout}>
        <div className={classes.Layout__Sidebar}>{this.props.sidebar}</div>
        {this.props.children}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    fetchDialogs: (userId) => dispatch(fetchDialogs(userId)),
  };
}

export default connect(null, mapDispatchToProps)(Layout);
