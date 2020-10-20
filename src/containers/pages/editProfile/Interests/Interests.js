import React from "react";
import Input from "../../../../components/UI/Input/Input";
import classes from "./Interests.module.scss";
import axios from "../../../../axios/axios";
import { Card } from "../../../../components/UI/Card/Card";
import { connect } from "react-redux";
import {
  loadUserNameFromServer,
  updateUserName,
  changeValue,
} from "../../../../store/actions/editProfile";
import { UserItem } from "../../../../components/UI/UserItem/UserItem";
import { UserPhoto } from "../../../../components/UI/UserPhoto/UserPhoto";

class Interests extends React.Component {
  constructor(props) {
    super(props);

    this.name = this.props.name;
    this.surname = this.props.surname;

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSendHandler = this.onSendHandler.bind(this);
  }

  onChangeHandler(e) {
    if (e.target.name === "Look") {
      this.props.changeValue(e.target.name, e.target.value);
      this.look = e.target.value;
    } else if (e.target.name === "Suggest") {
      this.props.changeValue(e.target.name, e.target.value);
      this.suggest = e.target.value;
    } else if (e.target.name === "Hobby") {
      this.props.changeValue(e.target.name, e.target.value);
      this.hobby = e.target.value;
    }
  }


  async onSendHandler() {
    const look = this.look;
    const suggest = this.suggest;
    const hobby = this.hobby;


    const userId = localStorage.getItem("userId");
    const requestData = {
      Look: look,
      Suggest: suggest,
      Hobby: hobby
    };
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
        <Card title="Интересы">
          <div className={classes.Info}>
            <UserPhoto size="lg" />
            <div className={classes.column}>

              <div className={classes.Row}>
                <div className={classes.input}>
                  <label style={{paddingLeft: 143}} htmlFor="Look">Я ищу:</label>
                  <input

                    name="Look"
                    value={this.props.nameValue}
                    onChange={this.onChangeHandler}
                    placholder="Введите тег"
                  ></input>
                </div>
              </div>

              <div className={classes.Row}>
                <div className={classes.input}>
                  <label style={{paddingLeft: 100}} htmlFor="Suggest">Я предлагаю:</label>
                  <input
                    name="Suggest"
                    value={this.props.surnameValue}
                    onChange={this.onChangeHandler}
                    placholder="Введите тег"
                  ></input>
                </div>
              </div>


              <div className={classes.Row}>
                <div className={classes.input}>
                  <label style={{paddingLeft: 117}} htmlFor="Hobby">Мои интересы:</label>
                  <input
                    style={{width: "356px"}}
                    name="Hobby"
                    onChange={this.onChangeHandler}
                    placeholder="Напишите пару слов о себе и своих интересах"
                    value={this.props.countryValue}
                  ></input>
                </div>
              </div>

              <button style={{width: '235px', marginLeft: '200px'}} onClick={this.onSendHandler}>Сохранить</button>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    name: state.editProfile.name,
    surname: state.editProfile.surname,
    accountType: state.editProfile.accountType,
    isAuthenticated: !!state.auth.token,
    userData: state.editProfile.userData,

    lookValue: state.editProfile.lookValue,
    suggestValue: state.editProfile.suggestValue,
    hobbyValue: state.editProfile.hobbyValue
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserName: (name, surname) => dispatch(updateUserName(name, surname)),
    loadUserNameFromServer: () => dispatch(loadUserNameFromServer()),
    changeValue: (value) => dispatch(changeValue(value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Interests);
