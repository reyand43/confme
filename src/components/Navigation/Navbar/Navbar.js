import React from "react";
import classes from "./Navbar.module.scss";

import { connect } from "react-redux";

import { UserPhoto } from "../../UI/UserPhoto/UserPhoto";
import {
  loadUserNameFromServer,
  clearUserName,
} from "../../../store/actions/editProfile";
import DropDown from "../../UI/DropDown/DropDown";
import { logout } from "../../../store/actions/auth";
import {
  changeProfileClicked,
  changeVisibility,
  hideDropDown,
} from "../../../store/actions/navbar";


class Navbar extends React.Component {
  dropDownHandler = () => {
    this.props.changeVisibility();
  };

  renderData() {
    //-----------------------
    const items = [
      {
        text: "Профиль",
        onClick: () => {
          if(this.props.profileClicked === false)
            this.props.changeProfileClicked(true);
        },
      },
      {
        text: "Выход",
        onClick: () => {
          this.props.clearUserName();
          this.props.logout();
        },
      },
    ];
    //----------------------
    return (
      <div className={classes.userInfo}>
        <DropDown
          onClick={this.dropDownHandler}
          styles={this.props.visible ? "active" : ""}
          items={items}
          state={this.props.profileClicked}
        >
          <div className={classes.userInfoBlock}>
            <p>
              {this.props.name} &nbsp; {this.props.surname}
            </p>
            <UserPhoto />
            <i className="fa fa-chevron-down" aria-hidden="true"></i>
          </div>
        </DropDown>
      </div>
    );
  }

  componentDidMount() {
    let isToken = !!localStorage.getItem("token");
    if (isToken) {
      this.props.loadUserNameFromServer();
    } else {
      this.props.clearUserName();
    }
  }
  // Закрытие дропдауна, супер костыльное, куда ни тыкни, везде закроет, кроме кнопки включения
  componentWillMount() {
    document.addEventListener('click', this.onClickOuterModal, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickOuterModal, false);
  }

  onClickOuterModal = (event) => {
    const modal = document.getElementsByClassName(classes.Navbar);
    console.log(modal)
    if (modal !== event.target) {
      this.props.hideDropDown();
    }
  };
  //------------------------------------------------
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
    visible: state.navbar.visibleDropDown,
    profileClicked: state.navbar.profileClicked,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeVisibility: () => dispatch(changeVisibility()),
    changeProfileClicked: (isProfile) =>
      dispatch(changeProfileClicked(isProfile)),
    logout: () => {
      dispatch(logout());
    },
    loadUserNameFromServer: () => dispatch(loadUserNameFromServer()),
    clearUserName: () => dispatch(clearUserName()),
    hideDropDown: () => dispatch(hideDropDown())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
