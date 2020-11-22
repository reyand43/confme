import React from "react";
import classes from "./Navbar.module.scss";
import { connect } from "react-redux";
import { UserPhoto } from "../../UI/UserPhoto/UserPhoto";
import {
  loadUserNameFromServer,
  clearUserName,
  fetchUserData,
} from "../../../store/actions/editProfile";
import DropDown from "../../UI/DropDown/DropDown";
import { logout } from "../../../store/actions/auth";
import { withRouter } from "react-router-dom";
import Time from "../../Time/Time";
import { Logo } from "../../UI/Logo/Logo";
import { clearState } from "../../../store/actions/dialogList";

class Navbar extends React.Component {
  renderData() {
    //-----------------------
    const items = [
      {
        text: "Редактировать профиль",
        onClick: () => {
          this.props.history.push("/editProfile");
        },
      },
      // {
      //   text: "Трансляция",
      //   onClick: () => {
      //     this.props.history.push("/broadcast");
      //   },
      // },
      {
        text: "Выход",
        onClick: () => {
          this.props.logout();
          this.props.clearState();
        },
      },
    ];
    //----------------------
    return (
      <div
        className={classes.userBlock}
        style={this.props.isAuthenticated ? null : { display: "none" }}
      >
        {/* <div className={classes.bellBlock}>
          <span>3</span>
          <i className="fa fa-bell" aria-hidden="true"></i>
        </div> */}
        <div className={classes.userInfo}>
          <DropDown items={items}>
            <div className={classes.userInfoBlock}>
              <span>
                {this.props.userData.Name} &nbsp; {this.props.userData.Surname}
              </span>
              <UserPhoto />
              <i className="fa fa-chevron-down" aria-hidden="true"></i>
            </div>
          </DropDown>
        </div>
      </div>
    );
  }

  componentDidMount() {
    let isToken = !!localStorage.getItem("token");
    if (isToken) {
      this.props.fetchUserData();
    } else {
      this.props.clearUserName();
    }
  }

  //------------------------------------------------
  render() {
    return (
      <div className={classes.Navbar}>
        <div className={classes.Navbar__Logo}>
          <Logo />
        </div>

        <div className={classes.Navbar__TimeAndProfile}>
          <div className={classes.Navbar__EventTime}>
            <div className={classes.Navbar__EventTime__UpperText}>
              Время мероприятия
            </div>
            <div className={classes.Navbar__EventTime__LowerText}>
              <Time utc={3} city="Москва" />
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
    userData: state.editProfile.userData,

    //visible: state.navbar.visibleDropDown,
    //profileClicked: state.navbar.profileClicked,
    isAuthenticated: !!state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(logout());
    },
    fetchUserData: () => dispatch(fetchUserData()),
    // hideDropDown: () => dispatch(hideDropDown()),
    clearState: ()=>dispatch(clearState())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
