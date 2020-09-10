import React from "react";
import Input from "../../../components/UI/Input/Input";
import classes from "./EditProfile.module.scss";
import axios from "../../../axios/axios";
import { Card } from "../../../components/UI/Card/Card";
import { UserPhoto } from "../../../components/UI/UserPhoto/UserPhoto";
import { connect } from "react-redux";
import { updateUserName } from "../../../store/actions/editProfile";
import { fetchData } from "../../../store/actions/navbar";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.name = this.props.name
    this.surname = this.props.surname
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSendHandler = this.onSendHandler.bind(this);
  }
  onChangeHandler(e) {
    if(e.target.name === "Name") {
      this.name = e.target.value
    }
    else if(e.target.name === "Surname"){
      this.surname = e.target.value
    }

  }

  async onSendHandler() {
    const name = this.name
    const surname = this.surname
    console.log(name + " " + surname)
    const userId = localStorage.getItem("userId");
    const requestData = {Name: name, Surname: surname};
    try {
      await axios.patch(`/users/${userId}/personalData.json`, requestData);
      localStorage.setItem("userName", this.name);
      localStorage.setItem("userSurname", this.surname);
      this.props.updateUserName(this.name, this.surname);
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
              {this.name}&nbsp;
              {this.surname}{" "}
            </p>
          </div>
          <div className={classes.Inputs}>
            <div className={classes.Row}>
              <Input
                label="Имя"
                name="Name"
                onChange={this.onChangeHandler}
                placeholder={localStorage.getItem("userName")}
              ></Input>
              <Input
                label="Фамилия"
                name="Surname"
                onChange={this.onChangeHandler}
                placeholder={localStorage.getItem("userSurname")}
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
    surname: state.editProfile.surname
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserName: (name, surname) => dispatch(updateUserName(name, surname)),
    fetchData: () => dispatch(fetchData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
