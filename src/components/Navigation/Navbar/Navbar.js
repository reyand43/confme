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


class Navbar extends React.Component {

  constructor(props) {
    super(props);

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
          this.props.hideDropDown()
          if(this.props.profileClicked === false)
            this.props.changeProfileClicked(true);
        },
      },
      {
        text: "Выход",
        onClick: () => {
          this.props.hideDropDown()
          this.props.clearUserName();
          this.props.logout();
        },
      },
    ];
    //----------------------
    return (
      <div className={classes.userBlock}>
        <div className={classes.bellBlock}>
          <span>3</span>
          <i className="fa fa-bell" aria-hidden="true"></i>
          </div>
      <div className={classes.userInfo} ref={this.setWrapperRef}>
        <DropDown
          onClick={this.dropDownHandler}
          styles={this.props.visible && this.props.isAuthenticated ? "active" : ""}
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
      </div>
    );
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
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
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.hideDropDown();
    }
  }

 
  //------------------------------------------------
  render()
   {
    return (
      <div className={classes.Navbar}>
        <div className={classes.SearchBlock}>
        <i className="fa fa-search" aria-hidden="true"></i>
        <input placeholder='Поиск' />
        </div>
        
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
    isAuthenticated: !!state.auth.token,
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
