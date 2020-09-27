import React from "react";
import classes from "./DialogList.module.scss";
import { DialogListItem } from "../../../components/UI/DialogListItem/DialogListItem";
import { connect } from "react-redux";
import { fetchDialogs } from "../../../store/actions/dialogList";
import { fetchUserById } from "../../../store/actions/users";
import { NavLink } from "react-router-dom";

class DialogList extends React.Component {
  componentDidMount() {
    this.props.fetchDialogs(localStorage.getItem("userId"));
    console.log("mounted");
  }

  renderDialogs() {
    const uid = localStorage.getItem("userId");
    return this.props.dialogs.map((dialog) => {
      return (
        <NavLink
          className={classes.nostyle}
          key={dialog.withId}
          to={"/dialogs/" + dialog.withId}
        >
          <li>
            <DialogListItem
              name={dialog.name}
              surname={dialog.surname}
              text={dialog.userId === uid ? `Вы: ${dialog.text}` : dialog.text}
              time={dialog.time}
            />
          </li>
        </NavLink>
      );
    });
  }

  render() {
    return (
      <div className={classes.wrapper}>
        <div className={classes.DialogList}>
          <div className={classes.SearchBlock}>
            <div className={classes.SearchButton}>
              <i className="fa fa-search" aria-hidden="true"></i>
            </div>
            <input placeholder="Поиск"></input>

            <div className={classes.SearchButton}>
              <span>
                <i className="fa fa-times" aria-hidden="true"></i>
              </span>
            </div>
          </div>

          <ul>{this.renderDialogs()}</ul>
        </div>
        <div className={classes.DialogTypeChoose}>
          <div className={classes.DialogTypeChooseWrapper}>
            <ul>
              <li>
                <span>Все сообщения</span>
              </li>
              <li>
                <span>Участники</span>
              </li>
              <li>
                <span>Спонсоры</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dialogs: state.dialogList.dialogs,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDialogs: (userId) => dispatch(fetchDialogs(userId)),
    fetchUserById: (friendId) => dispatch(fetchUserById(friendId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogList);
