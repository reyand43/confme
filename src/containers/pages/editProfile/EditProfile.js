import React from "react";
import Input from "../../../components/UI/Input/Input";
import classes from "./EditProfile.module.scss";
import axios from "../../../axios/axios";
import { Card } from "../../../components/UI/Card/Card";
import { UserPhoto } from "../../../components/UI/UserPhoto/UserPhoto";
import { connect } from "react-redux";
import { updateUserName } from "../../../store/actions/editProfile";
import { changeProfileClicked } from "../../../store/actions/navbar";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.name = this.props.name;
    this.surname = this.props.surname;
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSendHandler = this.onSendHandler.bind(this);
  }
  onChangeHandler(e) {
    if (e.target.name === "Name") {
      this.name = e.target.value;
    } else if (e.target.name === "Surname") {
      this.surname = e.target.value;
    }
  }

  componentWillUnmount() {
    this.props.changeProfileClicked(false);
  }

  async onSendHandler() {
    const name = this.name;
    const surname = this.surname;
    const userId = localStorage.getItem("userId");
    const requestData = { Name: name, Surname: surname };
    try {
      this.props.updateUserName(this.name, this.surname);
      await axios.patch(`/users/${userId}/personalData.json`, requestData);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className={classes.EditProfile}>
        <Card title="Личные данные">
          <div className={classes.PhotoName}>
            <UserPhoto />
            <p>
              {this.props.name}&nbsp;
              {this.props.surname}{" "}
            </p>
          </div>
          <div className={classes.Inputs}>
            <div className={classes.Row}>
              <Input
                label="Имя"
                name="Name"
                onChange={this.onChangeHandler}
                placeholder={this.props.name}
              ></Input>
              <Input
                label="Фамилия"
                name="Surname"
                onChange={this.onChangeHandler}
                placeholder={this.props.surname}
              ></Input>
            </div>
          </div>
          <button onClick={this.onSendHandler}>Сохранить</button>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    name: state.editProfile.name,
    surname: state.editProfile.surname,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserName: (name, surname) => dispatch(updateUserName(name, surname)),
    changeProfileClicked: (isProfile) =>
      dispatch(changeProfileClicked(isProfile)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
