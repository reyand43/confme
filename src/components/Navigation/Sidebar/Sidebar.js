import React from "react";
import classes from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { Logo } from "../../UI/Logo/Logo";
import { connect } from "react-redux";
import { changeHover } from "../../../store/actions/sidebar";

class Sidebar extends React.Component {

  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHandler}
          >
            {link.icon}&nbsp;
            {link.label}
          </NavLink>
        </li>
      );
    });
  }
  render() {
    let labels = ["", "", "", "", ""]
    if(this.props.hover){
      labels = ["Новости", "Сообщения", "Материалы", "Расписание", "Войти"]
    }
    const links = [
      { to: "/feed", label: labels[0], icon: <i class="fa fa-newspaper-o" aria-hidden="true"></i>, exact: true },
      { to: "/messages", label: labels[1], icon: <i class="fa fa-newspaper-o" aria-hidden="true"></i>, exact: false },
      { to: "/materials", label: labels[2], icon: <i class="fa fa-newspaper-o" aria-hidden="true"></i>, exact: false },
      { to: "/timetable", label: labels[3], icon: <i class="fa fa-newspaper-o" aria-hidden="true"></i>, exact: false },
    ];
    if (!this.props.isAuthenticated) {
      links.push({ to: "/", label: labels[4], icon: <i class="fa fa-newspaper-o" aria-hidden="true"></i>, exact: true });
    }
    links.splice(0, 1, { to: "/feed", label: labels[0], icon: <i class="fa fa-newspaper-o" aria-hidden="true"></i>,  exact: false });
    return (
      <nav className={classes.Sidebar} onMouseEnter = {this.props.changeHover} onMouseLeave = {this.props.changeHover}>
        <Logo isOpen = {this.props.hover}/>
        <ul className="">{this.renderLinks(links)}</ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    hover: state.sidebar.hover
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeHover: () => dispatch(changeHover())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
