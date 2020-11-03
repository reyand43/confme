import React from "react";
import classes from "./Sidebar.module.scss";
import { NavLink, Redirect } from "react-router-dom";
import { Logo } from "../../UI/Logo/Logo";

class Sidebar extends React.Component {

  render() {
    return (
        <div className={classes.Sidebar}>
                <div className={classes.Sidebar__Menu}>
                  <ul>
                    <li>
                      <NavLink to="/timetable" activeClassName={classes.active}>
                        <i className="fa fa-calendar fa-lg" aria-hidden="true"></i>
                        Программа
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/users" activeClassName={classes.active}>
                      <i className="fa fa-users" aria-hidden="true"></i>
                        Участники
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dialogs" activeClassName={classes.active}>
                      <i className="fa fa-envelope-o fa-lg" aria-hidden="true"></i>
                        Сообщения
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/1">
                        <i className="fa fa-calendar fa-lg" aria-hidden="true"></i>
                        Спонсоры
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/agenda">
                        <i className="fa fa-calendar fa-lg" aria-hidden="true"></i>
                        Мое расписание
                      </NavLink>
                    </li>
                    <hr/>
                    <li>
                      <NavLink to="/3">
                        <i className="fa fa-calendar fa-lg" aria-hidden="true"></i>
                        Контакты
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/4">
                        <i className="fa fa-calendar fa-lg" aria-hidden="true"></i>
                       Опросы
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/5">
                      <i className="fa fa-paperclip fa-lg" aria-hidden="true"></i>
                        Материалы
                      </NavLink>
                    </li>
                  </ul>
                  <ul>
                    <li>
                    <NavLink to="/5">
                      <i className="fa fa-paperclip fa-lg" aria-hidden="true"></i>
                        Информация
                      </NavLink>
                    </li>
                    <li>
                    <NavLink to="/5">
                      <i className="fa fa-paperclip fa-lg" aria-hidden="true"></i>
                       Настройки
                      </NavLink>
                    </li>
                  </ul>

            </div>
          </div>

    );
  }
}


export default Sidebar
