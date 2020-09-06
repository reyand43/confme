import React from "react";
import classes from "./Sidebar.module.css";
import { NavLink} from "react-router-dom";
import { Logo } from "../../UI/Logo/Logo";

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
            {link.label}
          </NavLink>
        </li>
      );
    });
  }
  render() {
    const links = [
      { to: "/feed", label: "Новости", exact: true },
      { to: "/messages", label: "Сообщения", exact: false },
      { to: "/materials", label: "Материалы", exact: false },
      { to: "/timetable", label: "Расписание", exact: false },
    ];
    if (!this.props.isAuthenticated) {
      links.push({ to: "/", label: "Войти", exact: true });}
      links.splice(0, 1, { to: "/feed", label: "Новости", exact: false },)

      return (
        <nav className={classes.Sidebar}>
          <Logo />
          <ul className="">{this.renderLinks(links)}</ul>
        </nav>
      );
    }
  }

export default Sidebar;
