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
import Input from "../../UI/Input/Input";
import { withRouter } from "react-router-dom";
import Time from "../../Time/Time";
import { Logo } from "../../UI/Logo/Logo";

class Navbar extends React.Component {
  constructor() {
    super();
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  dropDownHandler = () => {
    this.props.changeVisibility();
  };

  renderData() {
    //-----------------------
    const items = [
      {
        text: "Профиль",
        onClick: () => {
          this.props.hideDropDown();
          this.props.history.push("/editProfile");
        },
      },
      {
        text: "Трансляция",
        onClick: () => {
          this.props.hideDropDown();
          this.props.history.push("/broadcast");
        },
      },
      {
        text: "Выход",
        onClick: () => {
          this.props.hideDropDown();
          this.props.clearUserName();
          this.props.logout();
        },
      },
    ];
    //----------------------
    return (
      <div
        className={classes.userBlock}
        style={this.props.isAuthenticated ? null : { display: "none" }}
      >
        <div className={classes.bellBlock}>
          <span>3</span>
          <i className="fa fa-bell" aria-hidden="true"></i>
        </div>
        <div className={classes.userInfo} ref={this.setWrapperRef}>
          <DropDown
            onClick={this.dropDownHandler}
            styles={this.props.visible ? "active" : ""}
            items={items}
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
      </div>
    );
  }

  componentDidMount() {
    
    document.addEventListener("mousedown", this.handleClickOutside);
    let isToken = !!localStorage.getItem("token");
    if (isToken) {
      this.props.loadUserNameFromServer();
    } else {
      this.props.clearUserName();
    }
  }
  // Закрытие дропдауна, супер костыльное, куда ни тыкни, везде закроет, кроме кнопки включения

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.hideDropDown();
    }
  }

  //------------------------------------------------
  render() {
    return (
      <div className={classes.Navbar}>
        <div className = {classes.Navbar__Logo}>
          <Logo />
        </div>
        
        <div className = {classes.Navbar__TimeAndProfile}>
          <div className = {classes.Navbar__EventTime}>
            <div className = {classes.Navbar__EventTime_UpperText}>Время мероприятия:</div>
            <div className = {classes.Navbar__EventTime__LowerText}>
                <Time utc = {3} city = 'Москва'/>
              </div>
          </div>
        {localStorage.getItem("userId") !== "null" ? this.renderData() : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    name: state.editProfile.nameValue,
    surname: state.editProfile.surnameValue,
    visible: state.navbar.visibleDropDown,
    profileClicked: state.navbar.profileClicked,
    isAuthenticated: !!state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeVisibility: () => dispatch(changeVisibility()),
    logout: () => {
      dispatch(logout());
    },
    loadUserNameFromServer: () => dispatch(loadUserNameFromServer()),
    clearUserName: () => dispatch(clearUserName()),
    hideDropDown: () => dispatch(hideDropDown()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
