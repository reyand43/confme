import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { UserPhoto } from "../UI/UserPhoto/UserPhoto";

import classes from "./ModalUser.module.scss";

class ModalUser extends React.Component {
  state = {
    isModalOpen: true,
  };
  componentWillMount() {
    this.root = document.createElement("div");
    document.body.appendChild(this.root);
  }
  componentWillUnmount() {
    document.body.removeChild(this.root);
  }

  toggleModal = () => {
    console.log("pressed");
    this.setState((state) => ({ isModalOpen: !state.isModalOpen }));
  };

  componentDidMount() {
    console.log("тут", this.props.user);
  }

  render() {
    return ReactDOM.createPortal(
      <div className={classes.ModalUser}>
        <div className={classes.UserCard}>
          <div className={classes.closeButton}>
            <i
              className="fa fa-times"
              aria-hidden="true"
              onClick={this.props.onClose}
            ></i>
          </div>
          <div className={classes.UserCard__Top}>
            <div className={classes.UserCard__Top__UserPhoto} />
            <div className={classes.column}>
              <div className={classes.row}>
                <p className={classes.UserCard__Top__Name}>
                  {this.props.user.name}&nbsp;{this.props.user.surname}
                </p>
                {!!this.props.user.age && (
                  <p className={classes.UserCard__Top__Age}>
                    {this.props.user.age}&nbsp;лет
                  </p>
                )}
              </div>
              {!!this.props.user.country && (
                <div className={classes.row}>
                  <p>
                    {this.props.user.country},&nbsp;{this.props.user.city}
                  </p>
                </div>
              )}
              <div className={classes.row}>
                <i className="fa fa-cup" aria-hidden="true"></i>
                <p>236 баллов</p>
              </div>
              <div className={classes.row}>
                <div className={classes.actionButtons}>
                  <NavLink to={"/dialogs/" + this.props.user.id}>
                    <div onClick={this.props.onClose}>
                      <i className="fa fa-envelope-o" aria-hidden="true"></i>
                    </div>
                  </NavLink>
                  <NavLink to={"/"}>
                    <div onClick={this.props.onClose}>
                      <i className="fa fa-clock-o" aria-hidden="true"></i>
                    </div>
                  </NavLink>
                  <NavLink to={"/"}>
                    <div onClick={this.props.onClose}>
                      <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                    </div>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          {!!this.props.user.profession && (
            <div className={classes.row}>
              <p className={classes.Title}>Должность</p>
              <p>{this.props.user.profession}</p>
            </div>
          )}
          {!!this.props.user.company && (
            <div className={classes.row}>
              <p className={classes.Title}>Компания</p>
              <p>{this.props.user.company}</p>
            </div>
          )}
          {!!this.props.user.phone && (
            <div className={classes.row}>
              <p className={classes.Title}>Телефон</p>
              <p>{this.props.user.phone}</p>
            </div>
          )}
          {!!this.props.user.purpose && (
            <div className={classes.row}>
              <p className={classes.Title}>Цель визита</p>
              <p>{this.props.user.purpose}</p>
            </div>
          )}
        </div>
      </div>,
      this.root
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.modal.user,
  };
}

export default connect(mapStateToProps, null)(ModalUser);
