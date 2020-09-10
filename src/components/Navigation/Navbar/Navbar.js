import React from "react";
import classes from "./Navbar.module.scss";
import { connect } from "react-redux";
import { fetchData } from "../../../store/actions/navbar";

import { NavLink } from "react-router-dom";
import { UserPhoto } from "../../UI/UserPhoto/UserPhoto";
import { updateUserName } from "../../../store/actions/editProfile";

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
    this.props.updateUserName(localStorage.getItem("userName"), localStorage.getItem("userSurname"))
  }

  render() {
    return (
        <div className={classes.Navbar}>
          {localStorage.getItem("userId") !== "null" ? this.renderData() : this.renderData()}
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    name: state.editProfile.name,
    surname: state.editProfile.surname
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: () => dispatch(fetchData()),
    updateUserName: (name, surname) => dispatch(updateUserName(name, surname)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
