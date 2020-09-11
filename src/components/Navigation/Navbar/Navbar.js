import React from "react";
import classes from "./Navbar.module.scss";
import { connect } from "react-redux";

import { NavLink } from "react-router-dom";
import { UserPhoto } from "../../UI/UserPhoto/UserPhoto";
import { updateUserName, loadUserNameFromServer } from "../../../store/actions/editProfile";
import axios from "../../../axios/axios";


class Navbar extends React.Component {
  renderData() {
    return (
      <div className={classes.userInfo}>
        <NavLink exact to="/editProfile">
          <div className={classes.userInfoBlock}>
            <p>
              {this.props.name} &nbsp; {this.props.surname}
            </p>
            <UserPhoto />
            <i className="fa fa-chevron-down" aria-hidden="true"></i>
          </div>
        </NavLink>
      </div>
    );
  }

  componentDidMount() {
    let isToken = !!localStorage.getItem("token")
    if(isToken) {
      this.props.loadUserNameFromServer();
    }
  }

  render() {
    return (
        <div className={classes.Navbar}>
          {localStorage.getItem("userId") !== "null" ? this.renderData() : null}
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    name: state.editProfile.name,
    surname: state.editProfile.surname,
    isAuthenticated: !!state.auth.token,
  }
}



function mapDispatchToProps(dispatch) {
  return {
    updateUserName: (name, surname) => dispatch(updateUserName(name, surname)),
    loadUserNameFromServer: () => dispatch(loadUserNameFromServer())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
