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
                      <i className="fa fa-map-o" aria-hidden="true"></i>
                        <span>Программа</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/users" activeClassName={classes.active}>
                      <i className="fa fa-users" aria-hidden="true"></i>
                      <span>Участники</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dialogs" activeClassName={classes.active}>
                      <i className="fa fa-envelope-o fa-lg" aria-hidden="true"></i>
                      <span>Сообщения</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/sponsors" activeClassName={classes.active}>
                      <i className="fa fa-star-o" aria-hidden="true"></i>
                        <span>Спонсоры</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/agenda" activeClassName={classes.active}>
                        <i className="fa fa-calendar fa-lg" aria-hidden="true"></i>
                        <span>Мое расписание</span>
                      </NavLink>
                    </li>
                    <hr/>
                    <li>
                      <NavLink to="/3" activeClassName={classes.active}>
                      <i className="fa fa-address-book-o" aria-hidden="true"></i>
                        Контакты
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/quizes" activeClassName={classes.active}>
                        <i className="fa fa-check-square-o" aria-hidden="true"></i>
                       Опросы
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/5" activeClassName={classes.active}>
                      <i className="fa fa-paperclip fa-lg" aria-hidden="true"></i>
                        Материалы
                      </NavLink>
                    </li>
                  </ul>
                  <ul>
                    <li>
                    <NavLink to="/welcomePage" activeClassName={classes.active}>
                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                        Информация
                      </NavLink>
                    </li>
                    <li>
                    <NavLink to="/5" activeClassName={classes.active}>
                    <i className="fa fa-cog" aria-hidden="true"></i>
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
